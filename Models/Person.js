const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');

//Define the person schema 
const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number
    },

    work: {
        type: String,
        enum: ['chef', 'owner', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
    },

    email: {
        type: String
    },

    address: {
        type: String
    },

    salary: {
        type: Number,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

PersonSchema.pre('save', async function(next) {
    const person = this;
    if (!person.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password, salt);
        person.password = hashPassword;
        next();
    }
    catch (e) {
        return next(e);
    }
})

PersonSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(e){
        throw e;
    }
    
}


// Create Person model
const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;