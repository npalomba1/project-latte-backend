const Type = require("../models/Type.models");
const mongoose = require("mongoose"); 

const drinkTypes = [
    {
        title: "Caffe Latte",
        hotOrIced: "hot",
        hasEspresso: "Espresso",
        hasMilk: "Steamed Milk",
        ingredients: ["Espresso", "Steamed Milk"],
        description: "Caffè latte is a coffee-based drink made primarily from espresso and steamed milk. It consists of one-third espresso, two-thirds steamed milk and about 1cm of foam.",
        id: 1
    },
    {
        title: "Cappuccino",
        hotOrIced: "hot",
        hasEspresso: "Espresso",
        hasMilk: "Steamed Milk",
        ingredients: ["Espresso", "Steamed Milk", "Foam"],
        description: "A cappuccino is a coffee-based drink made primarily from espresso and milk. It consists of one-third espresso, one-third steamed milk and one-third milk foam and is generally served in a 6 to 8-ounce cup.",
        id: 2
    },
    {
        title: "Caffe Mocha",
        hotOrIced: "hot",
        hasEspresso: "Espresso",
        hasMilk: "Steamed Milk",
        ingredients: ["Espresso", "Steamed Milk", "Chocolate"],
        description: "Like a caffe latte, it is typically one third espresso and two thirds steamed milk, but a portion of chocolate is added, typically in the form of sweet cocoa powder, although many varieties use chocolate syrup. Mochas can contain dark or milk chocolate.",
        id: 3
    },
    {
        title: "Flat White",
        hotOrIced: "hot",
        hasEspresso: "Espresso",
        hasMilk: "Steamed Milk",
        ingredients: ["Espresso", "Steamed Milk"],
        description: "Flat White is a coffee beverage from Australia and New Zealand. It is prepared by pouring microfoam (steamed milk from the bottom of a pitcher) over a single (30ml) or double shot (60ml) of espresso. It is similar to latte and cafe au lait and like other espresso based beverages it can be interpreted various ways.",
        id: 4
    }
]

mongoose
  .connect("mongodb://localhost/project-latte-server")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

  Type.create(drinkTypes)
  .then(function(results){
      console.log("Look at the drink types!", results);
      mongoose.connection.close();
  })
  .catch(function(error){
      console.log("Something went wrong", error.message);
      mongoose.connection.close();
  }); 