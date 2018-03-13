'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    image: String,
    hash: String,
    salt: String
}, {timestamps: true})

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
