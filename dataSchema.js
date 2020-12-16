//schema data


var mongoose = require('mongoose')
const { stringify } = require('querystring')
var Schema = mongoose.Schema

var player = new Schema({
    name: String,
    team: String,
    city: String,
    position: String,
    nickname: String,
    age: Number
})

const Players_info = mongoose.model("Players_info", player)

module.exports = Players_info