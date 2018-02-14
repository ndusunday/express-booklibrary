
var BookInstance = require('../models/bookinstance');
var Book = require('../models/book');
var async = require('async');

// include validators and sanitizers
const {body, validationResult} = require('express-validator/check');
const{ sanitizeBody } = require('express-validator/filter');

// Display list of all BookInstances.
exports.bookinstance_list = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: BookInstance list');

    BookInstance.find().populate('book')
    .exec(function (err, list_bookinstances){
        if (err){ return next(err);}
        
        // Successful so render
        res.render('bookinstance_list', {title:'Book Instance list', bookinstance_list:list_bookinstances});
    });
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function(req, res, next){
    BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, bookinstance){
        if (err){return next(err); }

        if (bookinstance == null) {
            var err = new Error("Book copy not found");
            return next(err);
        }

        res.render('bookinstance_detail', {title: 'BookInstace', bookinstance:bookinstance});
    });
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = function(req, res, next) {
    // We need to feature available books to the form
    Book.find({}, 'title')
        .exec(function(err, books){
            if(err) {return next(err)}
            res.render('bookinstance_form', {title: 'Create Instance', book_list: books});
        });
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
    // validate fields
    body('book', 'Please Select a book').isLength({min:1}).trim(),
    body('imprint', 'Imprint must be specified').isLength({min:1}).trim(),
    body('due_back', 'Invalid date').optional({checkFalsy:true}).isISO8601(),

    // Sanitize fields
    sanitizeBody('book').trim().escape(),
    sanitizeBody('imprint').trim().escape(),
    sanitizeBody('status').trim().escape(),
    sanitizeBody('due_back').toDate(),

    // Process the request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from the validation result
        const errors = validationResult(req);

        // First create a book instance
        var bookinstance = new BookInstance(
            {
                book: req.body.book,
                imprint: req.body.imprint,
                status: req.body.status,
                due_back: req.body.due_back,
            }
        );

        if(!(errors.isEmpty())){
            // Not Successful, contains error, render form again
            Book.find({}, 'title')
                .exec(function(err, books){
                    res.render('bookinstance_form', {title: 'Create a BookInstance', book_list:books, selected_book: bookinstance.book._id, errors:errors.array(), bookinstance:bookinstance} );
                });
                return;
        }
        else{
            // Data from form is valid
            bookinstance.save(function (err){
                if(err){ return next(err)}
                // Successful then redirect to the bookinstance detail
                res.redirect(bookinstance.url);
            });
        }
    }
]

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
};