const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    brand: String,
    status: String
})

var Brand = mongoose.model('Brand',BrandSchema, 'brands');

module.exports = Brand;