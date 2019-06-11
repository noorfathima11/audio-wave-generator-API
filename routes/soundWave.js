const express = require('express')
const router = express.Router()

const senderMQ = require('../rabbitMQ/sender')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/')
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})
//polling
//scaling
//status
//ffmpeg
const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'audio/wav'){
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  //fileFilter: fileFilter
})


router.get('/', (req, res, next) => {
  

})

router.post('/', upload.single('musicFile'), (req, res, next) => {
    console.log(req.file)
    const audioFilePath = req.file.path
    senderMQ.send(audioFilePath)
})

module.exports = router

