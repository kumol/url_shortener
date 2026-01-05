const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    subscription: { 
        subscription_type: { 
            type: String, 
            enum: ['free', 'basic'], 
            default: 'free' 
        },
        until: {
            type: Date
        }
    }
}, { timestamps: true });

userSchema.pre('save', function(next) {
    this.id = this._id.toString();
    if(this.subscription.subscription_type === 'free' && !this.subscription.until) {
        this.subscription.until = new Date(Date.now() + 30*24*60*60*1000);
    }
});

module.exports = mongoose.model('User', userSchema, "users");
