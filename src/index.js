const express = require("express");
const app = express();
app.use(express.json())

const upload = require("./middleware/uploads");

const moviecontroller = require("./controllers/movie.controller");

const {register,login}=require("./controllers/auth.controller")
app.post("/users/register",upload.single("profile_photo_url"),register);
app.post("/users/login",login)

app.use("/movies",moviecontroller);

module.exports=app