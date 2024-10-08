const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    budget:{
        type:Number,
        required:true
    },
    color:{
        type:"String",
        validate: {
            validator: function(value) {
              return /^#([A-Fa-f0-9]{6})$/.test(value);
            },
            message: 'A valid hexadecimal color code is required (e.g., "#ED4523").'
        },
        required:true,
        trim:true,
        uppercase:true
    }
},{collection:'budget'})

module.exports = mongoose.model('budget',budgetSchema)