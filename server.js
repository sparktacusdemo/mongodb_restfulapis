//mongodb+srv://dbUser1:<password>@gwcluster-08092020.1ebxg.mongodb.net/nba2021?retryWrites=true&w=majority

const express = require('express')
const mongoose = require('mongoose')

var app = express()
var Data = require('./dataSchema')

mongoose.connect("mongodb+srv://dbUser1:Admin00@gwcluster-08092020.1ebxg.mongodb.net/nba2021?retryWrites=true&w=majority")


mongoose.connection.once("open", () => {
    console.log("connected to DB!")
}).on("error", (error) => {
    console.log("failed to connect db" + error)
})


//REST API
//>>> PLAYERS INFOS

//FETCH all players : GET request
app.get('/players', (req,res) => {
    Data.find({}).then((DBitems) => {
        res.send(DBitems)
    })
})


//---CREATE
app.post("/post", (req, res) => {

    var player = new Data ({

        name: req.get('name'),
        team: req.get('team'),
        city: req.get('city'),
        position: req.get('position'),
        nickname: req.get('nickname'),
        age: req.get('age'),
    })

    player.save().then(() => {

        if (player.isNew == false) {

            console.log("saved data!")
            res.send("saved data!")

        } else {
            console.log("failed to save data!")
        }
    })

})

//DELETE PLAYER INFOS

app.post('/deleteplayer', (req, res) => {
    Data.findOneAndRemove({
    name: req.get("name")
    }, (err) => {
        console.log("failed delete action: " + err)
    })

    res.send("player deleted!")
})

//UPDATE PLAYER INFOS
app.post('/updateplayer', (req,res) => {

    Data.findOneAndUpdate({
        name: req.get("name")
    }, {
        name: req.get("name"),
        team: req.get("team"),
        city: req.get("city"),
        position: req.get("position"),
        nickname: req.get("nickname"),
        age: req.get("age")
    }, (err) => {
        console.log("update failed: " + err)
    })

    res.send("player Updated!")

})




//>>> API PLAYERS STATS 

var Data_stats = require('./statsSchema')

//get
app.get('/fetch', (req,res) =>{
    Data_stats.find({}).then( (DBitems) => {

        res.send(DBitems)

    })
})

//Create stat
//POST
app.post('/create', (req,res) => {
    var stat = new Data_stats({
        name: req.get('name'),
        pts: req.get('pts'),
        rb: req.get('rb'),
        ast: req.get('ast'),
        fgrate: req.get('fgrate'),
        fg3rate: req.get('fg3rate')
    })

    stat.save().then( () => {
        if (stat.isNew == false){
            console.log("stats data saved!")
            res.send("saved stats data!")
        } else {
            console.log("saved stats data failed")
        }
    })

})

//DELETE STAT
app.post('/deletestat', (req, res) => {
    Data_stats.findOneAndRemove({
        name: req.get("name")
    }, (err) => {
        console.log("delete stat failed: " + err)
    })

    res.send("stat deleted!")
})



//>>>  URL SERVER   >>>>>>>>>>>>>>>>>>>>>>>>>>
// http://192.168.1.16:8081/create
var server = app.listen(8081,"192.168.1.16", () => {
    console.log("server is running")
})