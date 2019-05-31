const axios = require('axios')
exports.readData = function(audioFile) {
  console.log('audioFile', audioFile)
  axios({
  url: audioFile,
  responseType: "arraybuffer"
}).then(response => {
  const audioData = response.data
  //it is of the type array buffer object
  console.log(typeof (audioData))
  console.log(audioData.byteLength)
  console.log(audioData)
  return audioData
})
}
