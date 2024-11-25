const mongoose = require('mongoose');
const {Schema} = mongoose


const chapter = new Schema({
    name:{type:String},
    content:{type:String},
    notebookid:{type:String},
})


module.exports=mongoose.model('chapter',chapter);