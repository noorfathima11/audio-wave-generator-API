const data = require('../data.json')
const fs = require('fs')
const path = require('path')
/*
exports.displayData = function(req, res) {
    console.log(data)
    fs.readFile('./sample.wav', (err, data) => {
        if(err) throw err
        console.log(data)
        res.send('Hi')
    })
}*/

exports.displayData = function(req, res){
    res.sendFile(path.join('../index.html'))

}