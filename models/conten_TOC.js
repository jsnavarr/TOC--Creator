var mongoose = require('mongoose');
 // optional shortcut to the mongoose.Schema class
var Schema = mongoose.Schema;

 var contentTOCSchema = new Schema({
    owner: {
        type: String,
        // required: true
    },
    HTML: {
        type: String,
        // required: true
    },
    keywords: {
        type: String,
        // required: true
    },
    date_updated: {
        type: Date,
        // default: new Date(),
        required: true
    },
    },{
    timestamps: true
  }
 );

 module.exports = mongoose.model('ContentTOC', contentTOCSchema);