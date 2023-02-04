const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({

    address: {
        building: {
            type: Number,
        },
        street: {
            type: String,
            trim: true,
            lowercase: true
        },
        zipcode: {
            type: String,
            trim: true,
            lowercase: true
        }

    },

    city: {
        type: String,
        required: [true, 'Please enter city name'],
        trim: true,
        lowercase: true
    },


    cuisine: {
        type: String,
        required: [true, 'Please enter cuisine name'],
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        required: [true, 'Please enter restaurant name'],
        trim: true,
        lowercase: true
    },


    restaurant_id: {
        type: Number,
        required: [true, 'Please enter restaurant id'],
        trim: true,
        lowercase: true
    },


});




//Custom Schema Methods
//1. Instance Method Declaration
RestaurantSchema.methods.getCuisine = function () {
    console.log(`Restaurant cuisine : ${this.cuisine}`)
    return `${this.cuisine}`
}

//2. Static method declararion
RestaurantSchema.statics.getRestaurantByCuisine = function (value) {
    return this.find({ cuisine: value })
}

//Writing Query Helpers
RestaurantSchema.query.byCuisine = function (cuisine) {
    return this.where({ cuisine: cuisine, })
};



const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;





