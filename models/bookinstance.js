var mongoose = require('mongoose');

var Schema = mongoose.Schema;

BookInstanceSchema = new Schema(
    {
        book: {type: Schema.ObjectId, ref: 'Book', required: true},
        imprint: {type: String, required: true},
        status: {type: String, required: true, enum:['Available', 'Maintainance', 'Loan', 'Reserved'], default: 'Maintanance' },
        due_back: {type: Date, default: Date.now},
    }
);

// Virtual for bookinstance url
BookInstanceSchema.virtual('url').get(function(){
    return '/catalog/bookinstance/'+ this._id;
});

// Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);