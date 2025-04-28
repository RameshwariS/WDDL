import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Home Page</h1>");
})

app.get("/about", (req, res) => {
    res.send("<h1>This is the About Page</h1>");
})

app.get("/contact", (req, res) => {
    res.send("<h1>Contact us at: email@example.com</h1>");
})

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    res.send(`<h1>User ID: ${id}</h1>`)
})

app.get("/products/:category/:productId", (req, res) => {
    const category = req.params.category;
    const productId = req.params.productId;
    res.json({category, productId});
})

const PORT = 3000;
app.listen(PORT, (req, res) => {
    console.log("App listening on Port 3000");
})