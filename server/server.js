require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");

const app = express();

//This middleware takes our json body data we put in postman
//and makes it nice for our create restaurant API
app.use(express.json());

//This prevents domain cors error because server and frontend run on different domains
//have to npm install cors
app.use(cors());

//Using 3rd party middle ware Morgan
//app.use(morgan("dev"));

//middleware example
/*app.use((req, res, next) => {
    console.log("yeah our middleware");
    next();
});*/

//Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try{
        //const results = await db.query("SELECT * FROM restaurants");
        const restaurantRatingsData = await db.query("SELECT * FROM restaurants " +
        "LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) " +
        "newReviews ON restaurants.id = newReviews.restaurant_id;");

        res.status(200).json({
            status: "success",
            results: restaurantRatingsData.rows.length,
            data: {
                restaurants: restaurantRatingsData.rows,
            },
        })
    }catch(err) {
        console.log(err);
    }
});

//Create a Restaurant
app.post("/api/v1/restaurants", async (req,res) => {
    console.log(req.body);
    try{
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *;",[req.body.name, req.body.location, req.body.price_range]);
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
    }catch(err){
        console.log(err);
    }
});

// Update Restaurants
app.put("/api/v1/restaurants/:id", async (req,res) => {
    console.log(req.params.id);
    console.log(req.body);
    try{
        const results = await db.query("UPDATE restaurants SET name = $1, location  = $2, price_range = $3 WHERE id = $4 returning *;",
        [req.body.name,req.body.location,req.body.price_range,req.params.id]
        );
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
    }catch(err){
        console.log(err);
    }
});

//Delete Restaurant
app.delete("/api/v1/restaurants/:id", async (req,res) => {
    try{
        const results = await db.query("DELETE FROM restaurants WHERE id = $1;", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
});

//Get a single Restaurant
app.get("/api/v1/restaurants/:id", async (req,res) => {
    console.log(req.params.id);
    try{
        //We don't want to use this kind of string when selecting from our DB
        //makes us vulnerable to SQL injection attacks, no string interpolation or literals in query
        //We want to use parameterized query
        //const results = await db.query(`SELECT * FROM restaurants WHERE id = ${req.params.id};`);
        //use this instead
        //const results = await db.query("SELECT $2 FROM restaurants WHERE id = $1;", [req.params.id, 'name']);
        //$2 will be associated with name and $1 will be associated with req.params.id
        const restaurant = await db.query("SELECT * FROM restaurants " +
        "LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) " +
        "newReviews ON restaurants.id = newReviews.restaurant_id WHERE id = $1", [req.params.id]);
        
        //when implementing reviews we could make another route just for this query, or we can combine like we're doing here
        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1;", [req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            },
        });
    }catch(err) {
        console.log(err);
    }
});

app.post("/api/v1/restaurants/:id/addReview", async (req,res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id,name,review,rating) VALUES ($1, $2, $3, $4) returning *;",[
            req.params.id,
            req.body.name,
            req.body.review,
            req.body.rating
        ])
        res.status(201).json({
            status:'success',
            data: {
                review: newReview.rows[0],
            },
        })
    }catch(err) {
        console.log(err);
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`)
});

/* the last line after our derived table, is just an alias or any name we give to our new created table, so it could be
newReviews on restaurants.id = newReviews.restaurant_id;

SELECT * FROM restaurants 
LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) 
newReviews ON restaurants.id = newReviews.restaurant_id;
*/