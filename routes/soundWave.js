const express = require('express')
const router = express.Router()

const senderMQ = require('../rabbitMQ/sender')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/')
  },
  filename: function(req, file, cb){
    console.log(file)
    const ext = file.mimetype.split('/')[1]
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})

//polling
//scaling
//status
//ffmpeg
const fileFilter = (req, file, cb) => {
  if(!file){
    cb()
  }
  if(file.mimetype === 'wav'){
    cb(null, true)
  } else {
    cb({message: "File type not supported"}, false)
  }
}

const upload = multer({
  storage: storage
  //fileFilter: fileFilter
})

let data


router.get('/', (req, res, next) => {


})

router.post('/', upload.single('musicFile'), (req, res, next) => {
    console.log('received POST request')
    console.log(req.file)
    let audioFilePath = req.file.path
    data = senderMQ.send(audioFilePath)
    res.json({"wave-form-data" : data})
})

module.exports = router

