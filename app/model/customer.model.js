const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const CustomerSchema = mongoose.Schema({
        id:Number,
        name:String,
		shopname:String,
		status:String
		



}, {
    timestamps: true
});

CustomerSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('customer', CustomerSchema);