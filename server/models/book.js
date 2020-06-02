const mongoose = require('mongoose');



const booksSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true
    },
    review: {
        type:String,
        default:'n/a'
    },
    pages: {
        type:String,
        default:'n/a',

    },
    rating: {
        type:Number,
        min:1,
        max:5
    },
    price:{
        type:String,
        default:'n/a'
    },
    ownerId: {
        type:String,
        required:true
    }
});



const Book = mongoose.model('Books',booksSchema);

module.exports = {Book}
