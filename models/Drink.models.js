const {Schema, model} = require('mongoose'); 

const drinkSchema = new Schema( {

    name: {
        type: String,
        required: true
    },
    hotOrIced: [{
        type: String,
        enum: ["hot", "iced"],
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
        // enum: ["Milk", "No Milk", "Steamed Milk", "Coffee", "Espresso", "Foam", "Chocolate", "Panela", "Hot Water", "Whiskey", "Ice Cream", "Sugar", "Cream" ] 
    }],
    flavors: [{
        type: String,
        enum: [" ", "Simple Syrup", "Vanilla", "Hazelnut", "Caramel", "Mocha", "Peppermint" ]
    }],
    alternativeMilks: [{
        type: String,
        enum: [" ", "Almond Milk", "Soy Milk", "Oat Milk", "Coconut Milk", "Pistachio Milk", "Whole Milk", "2% Milk", "Nonfat Milk", "Half-and-Half"]
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