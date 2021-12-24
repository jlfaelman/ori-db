const mongoose =  require('mongoose')
const Schema = mongoose.Schema;

const SelectionSchema = {
    option:String
}
const AttributeSchema  = {
    attribute: String,
    selection: [SelectionSchema]
};

var Selection = mongoose.model('selection',SelectionSchema);
var Attribute = mongoose.model('attribute',AttributeSchema,'attributes');
module.exports = Attribute,Selection;