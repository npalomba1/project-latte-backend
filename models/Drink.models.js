const {Schema, model} = require('mongoose'); 

const drinkSchema = new Schema( {

    name: {
        type: String,
        required: true
    },
    hotOrIced: [{
        type: String,
        enum: ["Hot", "Iced"],
        // required: true
    }], 
    hasEspresso: [{
        type: String,
        enum: ["Coffee", "Espresso", "Coffee and Espresso"] 
    }],
    hasMilk: [{
        type: String,
        enum: ["Milk", "No Milk", "Steamed Milk"] 
    }],
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String
    }, 
    ingredients: [{
        type: String,
        enum: ["Milk", "No Milk", "Steamed Milk", "Coffee", "Espresso", "Foam", "Chocolate", "Panela", "Hot Water", "Whiskey", "Ice Cream", "Sugar", "Cream" ] 
    }],
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
},
{
    timestamps: true
}

);

const Drink = model("Drink", drinkSchema); 

module.exports = Drink;  