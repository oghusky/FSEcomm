const express = require("express");
const app = express();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "simmcomm"
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");
// show all products
app.get("/", (req, res) => {
    let query = "SELECT * FROM groceries ORDER BY id DESC"
    connection.query(query, {}, (err, response) => {
        if (err) throw err;
        res.render("index", { title: "Home", products: response });
    });
});
// show product by id
app.get("/:product_id", (req, res) => {
    let query = "SELECT * FROM groceries WHERE ?"
    connection.query(query, { id: req.params.product_id }, (err, response) => {
        if (err) throw err;
        res.render("showOne", { title: "Show By ID", product: response });
    });
});
// show product by rating
app.get("/rating/:product_rating", (req, res) => {
    let query = "SELECT * FROM groceries WHERE ? ORDER BY id DESC"
    connection.query(query, { product_rating: req.params.product_rating }, (err, response) => {
        if (err) throw err;
        res.render("ratings", { title: "Show By Rating", products: response, rating: req.params.product_rating });
    });
});
app.get("/deals/:product_price/", (req, res) => {
    let query = "SELECT * FROM groceries WHERE product_price <= ?";
    connection.query(query, req.params.product_price, (err, response, fields) => {
        if (err) throw err;
        res.render("deals", { title: "Show Deals", products: response, price: req.params.product_price });
        console.log(req.params.product_price);
        console.log(response);
        console.log(fields);
    });
});
// show items
const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
