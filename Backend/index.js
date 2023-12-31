const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const  dotenv = require('dotenv');
dotenv.config();

const userRoutes = require("./routes/User")
const sessionRoutes = require("./routes/Session")
const emailRoutes = require("./routes/email")

app.use(cors(
    {
        origin: ["https://demo-updated-frontend.vercel.app"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(res => {
    console.log("Server connected");
}).catch(err => {
    console.log(err);
})

const port = process.env.PORT || 5000;
app.listen(port , () => {
      console.log("on port " + port);
})

app.use('/user', userRoutes);
app.use('/session', sessionRoutes)
app.use('/email', emailRoutes)
