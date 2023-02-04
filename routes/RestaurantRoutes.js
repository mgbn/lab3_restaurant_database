const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();



//Create New Record


// http://localhost:3000/restaurant
app.post('/restaurant', async (req, res) => {

    console.log(req.body)
    const restaurant = new restaurantModel(req.body);

    try {
        await restaurant.save((err) => {
            if (err) {

                res.send(err)
            } else {
                res.send(restaurant);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
});


//4.	Create REST API to return all restaurant details
//http://localhost:3000/restaurants

app.get('/restaurants', async (req, res) => {
    const restaurant = await restaurantModel.find({});

    try {
        console.log(restaurant[0].name)
        res.status(200).send(restaurant);
    } catch (err) {
        res.status(500).send(err);
    }
});


//Search By cuisine
//http://localhost:3000/restaurants/cuisine/Japanese

app.get('/restaurants/cuisine/:name', async (req, res) => {
    const name = req.params.name

    const restaurants = await restaurantModel.find({ cuisine: name });

    try {
        if (restaurants.length != 0) {
            res.send(restaurants);
        } else {
            res.send(JSON.stringify({ status: false, message: "No data found" }))
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


// 6.	Create REST API to return the 

// http://localhost:3000/restaurants?sortBy=ASC
// http://localhost:3000/restaurants?sortBy=DESC

app.get('/restaurants', async (req, res) => {


    console.log(req.query.sortBy);

    const restaurants = await restaurantModel.find({}).select("_id cuisine name city restaurant_id").sort({ 'restaurant_id': req.query.sortBy });


    try {

        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
});



// 7.	Create REST API to return restaurants details where all cuisines are equal to Delicatessen and the city is not equal to Brooklyn
// -	The selected columns must include cuisines, name and city, but exclude id
// -	The sorting order must be Ascending Order on the name

// http://localhost:3000/restaurants/Delicatessen

app.get('/restaurants/:cuisine', async (req, res) => {
    const cusine = req.params.cuisine;

    try {
        const restaurants = restaurantModel.
            find({})
            .where('cuisine').equals(cusine)
            .where('city').ne('Brooklyn')
            .select('cuisine name city')
            .sort({ 'name': 'asc' })
            .exec((err, data) => {
                if (err) {
                    res.send(JSON.stringify({ status: false, message: "No data found" }));
                } else {
                    res.send(data);
                }
            });
    } catch (err) {
        res.status(500).send(err);
    }
});




module.exports = app