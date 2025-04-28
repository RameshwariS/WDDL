import express from 'express';

const app = express();

app.get("/", (req, res) =>{
    res.send("<h1>Welcome to the Home Page</h1>");
})

app.get("/about", (req, res) =>{
    res.send("<h1>This is the About Page</h1>");
})

app.get("/contact", (req, res) =>{
    res.send("<h1>Contact us at: email@example.com</h1>");
})

const PORT = 3000;
app.listen(PORT, (req, res) => {
    console.log("App listening on Port 3000");
})