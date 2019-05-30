const express = require('express')
const router = express.Router()

const aboutModel = require('../models/about-model')


/* GET about page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: "'About' data was fetched"
  })
})

router.post('/', function(req, res, next){
  res.status(200).json({
    message: "This is a temporary 'about' data, until DB is designed and then data will be fetched form db"
  })
})

module.exports = router;


