const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ProductSchema = new Schema({
    name:String,
    sku:String,
    quantity:String,
    price:String,
    category:String,
    brand:String,
    store:String,
    description:String,
    image:String,
    // attributes:[{
    //     attribute:String
    // }],
});

var Product = mongoose.model('product',ProductSchema,'products');

module.exports = Product