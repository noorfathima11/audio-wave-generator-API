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
  const file = this.files[0]

  //Validation
  //Allowed types
  const mimeTypes = ['image/jpeg', 'image/png']

  //Validate MIME types
  if(mimeTypes.indexOf(file.type) === -1){
    alert('Error : Unsupported file type')
    return
  }

  // Validation is successful
  // Show the name of the file
  alert('You have chosen the file ' + file.name)
})

//Cancel button event
document.querySelector('#cancel-button').addEventListener('click', function(){
  
})
