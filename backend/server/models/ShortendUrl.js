const mongoose = require('mongoose');

const shortendUrlSchema = new mongoose.Schema({
    id:{
        type: String,
    },
    original_url: { 
        type: String,
        required: true
    },
    short_code: { 
        type: String, 
        required: true, 
        unique: true 
    },
    shortend_url: { 
        type: String, 
        required: true, 
        unique: true 
    },
    clicks: { 
        type: 
        Number, 
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: String
    }
});

shortendUrlSchema.pre('save', function(next) {
    this.id = this._id.toString();
});
module.exports = mongoose.model('ShortendUrl', shortendUrlSchema, "shortend_urls");