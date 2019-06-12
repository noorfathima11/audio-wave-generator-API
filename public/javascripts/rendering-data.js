//https://usefulangle.com/post/67/pure-javascript-ajax-file-upload-showing-progess-percent
// Show the file browse dialog
// using onClick will overRide the existing onClick event handlers if there are multiple functions
document.querySelector('#choose-upload-button').addEventListener('click', function(){
  document.querySelector('#upload-file').click()
})

//Once the user chooses a file, a 'change' event triggers on the file input element.
//Then we validate the file type and size
document.querySelector('#upload-file').addEventListener('change', function(){
  // Getting access to the first file selected
  // Represents the first file selected
  // This is the file user has chosen
  console.log('change happened')
  const file = this.files[0]
  console.log(file.type)

  //Validation
  //Allowed types
  const mimeTypes = ['audio/x-wav', 'audio/wav', 'mpeg']

  //Validate MIME types
  if(mimeTypes.indexOf(file.type) === -1){
    alert('Error : Unsupported file type')
    return
  }

  // Validation is successful
  // Show the name of the file
  alert('You have chosen the file ' + file.name)

  document.querySelector('#upload-choose-container').style.display = 'none'
  document.querySelector('#upload-file-final-container').style.display = 'block'
  document.querySelector('#file-name').innerText = file.name
})

//Cancel button event
document.querySelector('#cancel-button').addEventListener('click', function(){
  //document.querySelector('#error-message').classList.remove()
  document.querySelector('#upload-choose-container').style.display = 'block'
  document.querySelector('#upload-file-final-container').style.display = 'none'


  //'value' is a property of form field elements. All the elements which allow a user
  // to type something in or select something have a value property with js
  document.querySelector('#upload-file').setAttribute('value', '')
})

//Uploading via Ajax
document.querySelector('#upload-button').addEventListener('click', function(){
  //create a new form
  let data = new FormData()
  //To begin creating the XHR request, create a new request object using the
  //XMLHttpRequest() constructor
  let request = new XMLHttpRequest()

  console.log('form created')

  //add the file key and set it's value to the file selected by the user
  data.append('musicFile', document.querySelector('#upload-file').files[0])

  console.log('file appended to form')

  //request.responseType = 'json'
  request.open('POST', 'http://localhost:3000/soundWave/', true)
  request.send(data)

  //Use the 'load' event.
  request.addEventListener('load', function(e){
    console.log('form fully loaded')
    document.querySelector('#upload-progress').style.display = 'none'

    if(request.response.error === 1){
      console.log('error received')
      document.querySelector('#error-message').innerText = request.response.message
      document.querySelector('#error-message').style.display = 'block'
    }
    else if(request.response.error = 0){
      console.log('no error received')
      document.querySelector('#cancel-button').click()
      alert('File uploaded successfully')
    }

    //Use the 'progress' event to get periodic update when a request receives more data
    //Will be using the parameter 'e'which is automatically passed from Javascript to our function
    //when we add an event listener. It represents the element that was affected
    request.upload.addEventListener('progress', function(e){
      let percentComplete = (e.loaded / e.complete) * 100
      document.querySelector('#upload-progress').innerText = percentComplete
      document.querySelector('#upload-progress').style.display = 'block'
    })
  })
})

