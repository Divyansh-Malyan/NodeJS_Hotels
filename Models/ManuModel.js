const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },

    Price:{
        type: Number,
        default: 80,
        required: true
    },

    FoodType:{
        type: String,
        default: "Chinese Food",
        required: true
    },

    Taste:{
        type: String,
        default: "Salty",
        required: true
    }
})

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;