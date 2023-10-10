require('dotenv').config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");



const {connection} = require('./database/dbConfig');
const port = process.env.PORT;



//* DataBase Connection
connection();



const {initializePassport} = require("./utils/passport");

// $ Importing Routes
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");


//$ Middleware that allows Express to parse through both JSON and x-www-form-urlencoded request bodies
//$ These are the same as `bodyParser` - you probably would see bodyParser put here in most apps

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
app.use(passport.authenticate("session"));
 
initializePassport(passport);




// $ Routes Endpoints
app.use("/auth", authRouter.router);
app.use("/product",productRouter.router);
app.use("/cart",cartRouter.router);



//* Server side Port
app.listen(port,()=>{
    console.log(`Server Running at ${port}`);
})
 