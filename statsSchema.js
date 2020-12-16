// data schema for players stats: regular season

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Float = require('mongoose-float').loadType(mongoose,2)

var stat = new Schema({
    name: String,
    pts: Float,
    rb: Float,
    ast: Float,
    fgrate: Float,
    fg3rate: Float
})

const Players_reg_stat = mongoose.model("Players_reg_stat",stat)

module.exports = Players_reg_stat