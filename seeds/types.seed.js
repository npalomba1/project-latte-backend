const Type = require("../models/Type.models");
const mongoose = require("mongoose"); 

const drinkTypes = [
    {
        title: "Caffe Latte",
        hotOrIced: "hot",
        hasEspresso: "Espresso",
        hasMilk: "Steamed Milk",
        description: "Caffè latte is a coffee-based drink made primarily from espresso and steamed milk. It consists of one-third espresso, two-thirds steamed milk and about 1cm of foam.",
        id: 1
    },
    {
        title: "Cappuccino",
        hotOrIced: "hot",
        hasEspresso: "Espresso",
        hasMilk: "Steamed Milk",
        description: "A cappuccino is a coffee-based drink made primarily from espresso and milk. It consists of one-third espresso, one-third steamed milk and one-third milk foam and is generally served in a 6 to 8-ounce cup.",
        id: 2
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