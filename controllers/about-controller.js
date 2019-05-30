const about = require('../models/about-model')

//Send 'about' data
exports.aboutData = function(req, res){
    res.status(200).json({
        message: 'This is about temporary about data'
    })
}