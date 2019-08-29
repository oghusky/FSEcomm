const express = require("express");
const app = express();
const dbURL = require("./utils/config.env");
const mysql = require("mysql");
const Products = require("./models/Products");

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
app.get("/", (req, res) => {
    let query = "SELECT * FROM groceries"
    connection.query(query, {}, (err, response) => {
        if (err) throw err;
        res.render("index", { title: "Home", products: response });
    });
    connection.end();
});
app.get("/:product_id", (req, res) => {
    // let query = "SELECT * FROM groceries WHERE ?"
    connection.query("SELECT * FROM groceries WHERE ?", { id: req.params.product_id }, (err, response) => {
        if (err) throw err;
        res.render("showOne", { title: "Home", product: response });
    });
    connection.end();
});
const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
