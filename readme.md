Basic requirement:
- Accepts a music file
- Returns the waveform data

Project Workflow:
- Initializing the project with npm
- Creating a server to accept requests
- Defining the routes:
    This microservice has two endpoints:
    1) An 'About' endpoint which will return the information about the application.
    2) A 'Waveform' endpoint which will return the waveform data.
- Database design:
  - If we want to POST a new sound file data with the filename and format and if we want to store it in the database - here I have used mongoDB collections
  - Through POST request filename, format and file can be submitted.
  - The file will be stored on the disk and it's location stored on the database.
  - Through GET request, all the waveform data can be accessed.

Message Queue and System Design: https://www.youtube.com/watch?v=oUJbuFMyBDk
- Will be using RabbitMQ

Message Broker:

Uploading the music file:
  Accepting and storing files:
  - We do this for soundWave - We POST a new music file
    We accept a music file
    Store it on server
    Also store an entry in the DB with the location of the stored image
  We can send this back with a GET request
  - So we accept the music file in the POST route of /soundWaveform

HTML page:
Uploading a file
- To create a drop down menu: <select> One of the suggested option is required
- To create a custom button: File API



Dependencies:
- Express
- Multer (for handling multipart/form-data requests) - express doesn't parse multi-part form data
- MongoDB (official mongodb nodejs driver)

Node-module dependencies:
- Stream (Node module that handles streaming of data)
- Babel



More:
- Audio upload must be resumable if it has been stopped
- Audio upload can be cancellable at any point of time

Version 2:
- Want to get waveform as stream and convert stream to image

This is the version with processing done on the server

Wav: WAV files contain raw audio data in the form of samples from beginning to end to paint the waveform of the output, the same way a bitmap file contains raw data about pixels from left to right, top to bottom. You can think of a WAV file as a bitmap picture of sound waves -- but rather than pixel colors, it stores audio intensities, typically 44,100 of them per second, for two channels if it's stereo, and 2 bytes per channel.

References:
- https://github.com/jhurliman/node-pcm
- https://github.com/chrisweb/waveform-data-generator/blob/master/server/library/audioDataAnalyzer.js
Microsoft:
Part 1:
- https://blogs.msdn.microsoft.com/dawate/2009/06/22/intro-to-audio-programming-part-1-how-audio-data-is-represented/
Part 2: https://blogs.msdn.microsoft.com/dawate/2009/06/23/intro-to-audio-programming-part-2-demystifying-the-wav-format/
Part 3: https://blogs.msdn.microsoft.com/dawate/2009/06/24/intro-to-audio-programming-part-3-synthesizing-simple-wave-audio-using-c/
Part 4: https://blogs.msdn.microsoft.com/dawate/2009/06/25/intro-to-audio-programming-part-4-algorithms-for-different-sound-waves-in-c/
- https://stackoverflow.com/questions/26663494/algorithm-to-draw-waveform-from-audio
- https://stackoverflow.com/questions/13209099/generating-an-mp3-wav-ogg-waveform-using-java
- https://stackoverflow.com/questions/12879210/how-can-i-draw-sound-data-from-my-wav-file
- https://stackoverflow.com/questions/11017283/java-program-to-create-a-png-waveform-for-an-audio-file
- https://github.com/likethemammal/visualizer-micro/blob/master/src/visualizer-micro.js
- https://www.npmjs.com/package/visualizer-micro
- https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js
- https://davidwalsh.name/waveform
- https://trac.ffmpeg.org/wiki/Waveform
- https://stackoverflow.com/questions/41647492/get-waveform-data-from-audio-file-using-ffmpeg/41663511
- http://blog.wudilabs.org/entry/c3d357ed/?lang=en-US
- https://manual.audacityteam.org/man/audacity_waveform.html
- https://stackoverflow.com/questions/3432860/mp3-byte-array-convert-to-wav-and-navigate-to-time-index

https://www.npmjs.com/package/audio-waveform
https://github.com/trquoccuong/node-wave
https://github.com/andrewrk/node-waveform

https://stackabuse.com/read-files-with-node-js/
https://pedromtavares.wordpress.com/2012/12/28/streaming-audio-on-the-web-with-nodejs/
https://rodic.fr/blog/libavcodec-tutorial-decode-audio-file/

https://en.wikipedia.org/wiki/Data_structure_alignment

https://www.3pillarglobal.com/insights/rabbitmq-understanding-message-broker
