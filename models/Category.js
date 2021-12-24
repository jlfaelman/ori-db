const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category: String,
    status: String
})

var Category = mongoose.model('Category',CategorySchema, 'categories');

module.exports = Category;