const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
    name:{type:String,required:true},
    actor:[{type:String,required:true}],
    languages:[{type:String,required:true}],
    directors:[{type:String,required:true}],
    poster_url:{type:String}

})


module.exports = mongoose.model("movie",moviesSchema);