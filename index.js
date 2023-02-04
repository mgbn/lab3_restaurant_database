const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('./routes/RestaurantRoutes.js');

const app = express();
app.use(express.json()); // Make sure it comes back as json

//TODO - Replace you Connection String here



mongoose.connect("mongodb+srv://Mustafa:m1g2b3n4@cluster0.zf9udrk.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(restaurantRouter);

app.listen(3000, () => { console.log('Server is running...') });