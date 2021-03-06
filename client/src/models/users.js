const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname: { type: String, required: false },
    email: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
