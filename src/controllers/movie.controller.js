const express = require("express");

const router = express.Router()

const movie = require("../models/movies.model");
const theatre = require("../models/theatres.model")

const authorise = require("../middleware/authorise");

const authenticate = require("../middleware/authentication");


router.post("/",async(req,res)=>{
    try{
        const theatre = req.theatre
        

        const movies = await movie.create({
            name:req.body.name,
            actor:req.body.actor,
            languages:req.body.languages,
            directors:req.body.directors,
           



        })
        console.log(movies)
        return res.status(201).json({movies})

    }catch(e)
    {

        res.status(500).json({status:"Failed",message:e.message})

    }
})
router.post("/theatre",async(req,res)=>{
    try{
       

        const theatres = await theatre.create({
            name:req.body.name,
            location:req.body.location
           



        })
        console.log(theatres)
        return res.status(201).json({theatres})

    }catch(e)
    {

        res.status(500).json({status:"Failed",message:e.message})

    }
})






// router.post("/screen",async(req,res)=>{
//     try{
//         const theatre = req.theatre
//         console.log(theatre);

//         const screen = await movie.create({
//             name:req.body.name,
//             theatre:theatre.theatre._id
           



//         })
//         console.log(screen)
//         return res.status(201).json({screen})

//     }catch(e)
//     {

//         res.status(500).json({status:"Failed",message:e.message})

//     }
// })
















// router.post("/shows",authenticate,async(req,res)=>{
//     try{
//         const movie = req.movie
//         const screen = req.screen
//         console.log(user);

//         const show = await movie.create({
//             timing:req.body.timing,
//             movie:movie.movie._id,
//             total_seats:req.body.total_seats,
//             screen:screen.screen._id



//         })
//         console.log(show)
//         return res.status(201).json({show})

//     }catch(e)
//     {

//         res.status(500).json({status:"Failed",message:e.message})

//     }
// })


module.exports = router;