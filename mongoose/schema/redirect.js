const mongoose = require('mongoose');
const user = new mongoose.Schema(
      [
        {
          name: String,
          redirect: String,
          owned: String // Admin
        },
      ]
);

const User = mongoose.model('User', user);

module.exports = User