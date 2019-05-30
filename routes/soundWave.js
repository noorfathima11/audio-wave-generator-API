const express = require('express')
const router = express.Router()

const soundWaveModel = require('../models/soundWave-model')

router.get('/', (req, res, next) => {  
    res.status(200).json({
        message : "Waveform data was fetched"

    })
})

router.post('/', (req, res, next) => {
    const soundWave = {
        filename: req.body.filename,
        format: req.body.format
    }
    console.log(soundWave)
    res.status(201).json({
        message: "This is temporary 'waveform' data created until DB is designed and data fetched from the DB",
        soundWave : soundWave
    })
})

module.exports = router

