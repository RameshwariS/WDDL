const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db.js")
const cors = require('cors');


//configure dotenv
dotenv.config();

// REST object
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());



//routes
app.use("/api/v1/student", require("./routes/studentRoutes.js"))

app.get("/test", (req, res) => {
    res.status(200).send('<h1>Node.js Mysql app</h1>')
})

//PORT
const PORT = process.env.PORT || 3000;

// conditionally listen
mySqlPool
    .query('SELECT 1')
    .then(() => {

        // check mysql connection
        console.log('Connected to Mysql');

        //listen
        app.listen(PORT, () => {
            console.log(`Server running on Port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })


