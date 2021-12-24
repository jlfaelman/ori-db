const mongoose = require('mongoose');
const Schema = mongoose.Schema

const StoreSchema = new Schema({
    store: String,
    status: String
})

var Store = mongoose.model('Store',StoreSchema,'stores');
module.exports = Store;