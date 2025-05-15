const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
    role: {
    type: String,
    enum: ['admin', 'user'],
    required: true
  },
    email:String,
    password:String

});

const User = mongoose.model('User', userSchema);

module.exports = User;