

exports.readData = function(audioFilePath) {
  console.log('filePath', audioFilePath)
  fs.readFile(audioFilePath, (err, data) => {
    console.log('data', data)
    if (err) throw err
    return data
  })
}


