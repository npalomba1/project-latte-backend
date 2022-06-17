const { Schema, model} = require("mongoose");

const typeSchema = new Schema( {
    title: {
        type: String,
        required: true
    },
    hotOrIced: [{
        type: String,
        enum: ["hot", "iced"]
    }],
    hasEspresso: [{
        type: String,
        enum: ["Coffee", "Espresso", "Coffee and Espresso"]
    }],
    hasMik: [{
        type: String,
        enum: ["Milk", "No Milk", "Steamed Milk"]
    }],
    description: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
    

})

const Type = model('Type', typeSchema);

module.exports = Type; 