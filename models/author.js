// require mongoose
var mongoose = require('mongoose');
var moment = require('moment');

// define a shema
var Schema = mongoose.Schema;

// make an instance of author schema
var AuthorSchema = new Schema(
    {
    first_name: {type: String, required: true, max:100 },
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
    }
);

// Virtual for author's full name
AuthorSchema.virtual('name').get(function(){
    return this.first_name+ ' '+ this.family_name;
});

// Virtua for author's full name
AuthorSchema.virtual('url').get(function(){
    return '/catalog/author/' + this._id;
});

AuthorSchema.virtual('birth_date_formatted')
.get(function (){
    return moment(this.date_of_birth).format('MMMM Do, YYYY');
})

AuthorSchema.virtual('death_date_formatted')
.get(function () {
    return moment(this.date_of_death).format('MMMM Do, YYYY');
})
// Export model
var AuthorModel = mongoose.model('Author', AuthorSchema);
module.exports = AuthorModel;