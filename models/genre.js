// require mongoose
var mongoose = require('mongoose');

// define a shema
var Schema = mongoose.Schema;

// make an instance of genre schema
var GenreSchema = new Schema(
    {
        name: {type: String, required: true, min: 3, max:100, default: 'Unknown' },
    }
);

// Virtual for genre url
GenreSchema.virtual('url').get(function(){
    return '/catalog/genre/' + this._id;
});
// Export model
var GenreModel = mongoose.model('Genre', GenreSchema);
module.exports = GenreModel;