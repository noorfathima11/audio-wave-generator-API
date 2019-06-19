Basic requirement:
- Accepts a music file
- Returns the waveform data

Project Workflow:
- Initializing the project with npm
- Creating a server to accept requests
- Defining the routes:
    This microservice has only one endpoints:
    2) A 'Waveform' (/soundWave) endpoint which will return the waveform data.

Message Queue and System Design: https://www.youtube.com/watch?v=oUJbuFMyBDk
- Will be using RabbitMQ


Uploading the music file:
  Accepting and storing files:
  - We do this for soundWave - We POST a new music file
    We accept a music file
    Store it on disk

- We need to run a function on the remote server and wait for the result
- We use RPC. We build RabbitMQ to build an RPC system
- The client sends a request message and a server sends a response message . In order to receive a response we need to send a callback queue address with the request. 

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
