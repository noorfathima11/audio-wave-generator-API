module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./bin/www");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\n\nvar createError = __webpack_require__(/*! http-errors */ \"http-errors\");\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar logger = __webpack_require__(/*! morgan */ \"morgan\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar multer = __webpack_require__(/*! multer */ \"multer\");\n\nvar mongodb = __webpack_require__(/*! mongodb */ \"mongodb\");\n\nvar assert = __webpack_require__(/*! assert */ \"assert\");\n\nvar url = 'mongodb://localhost:27017/test'; //using the mongo driver\n\nvar mongoClient = __webpack_require__(/*! mongodb */ \"mongodb\").MongoClient;\n\nvar objectId = __webpack_require__(/*! mongodb */ \"mongodb\").ObjectID;\n\nvar _require = __webpack_require__(/*! stream */ \"stream\"),\n    Readable = _require.Readable;\n\nvar aboutRouter = __webpack_require__(/*! ./routes/about */ \"./routes/about.js\");\n\nvar soundWaveRouter = __webpack_require__(/*! ./routes/soundWave */ \"./routes/soundWave.js\");\n\nvar app = express(); //Connect mongo driver to mongodb\n\nvar db; // specifying the connection URL and connecting the database\n\nmongoClient.connect(url, function (err, database) {\n  if (err) {\n    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');\n    process.exit(1);\n  }\n\n  db = database;\n}); // view engine setup\n\napp.set('views', path.join(__dirname, 'views'));\napp.set('view engine', 'jade');\napp.use(logger('dev'));\napp.use(express.json());\napp.use(express.urlencoded({\n  extended: false\n}));\napp.use(express[\"static\"](path.join(__dirname, 'public')));\napp.use('*.js', function (req, res, next) {\n  res.set('Content-Type', 'text/javascript');\n  next();\n});\napp.use(bodyParser.urlencoded({\n  extended: false\n})); // parse json bodies\n\napp.use(bodyParser.json());\n/*app.use((req, res, next) => {\n  res.header('Access-Control-Allow-Origin', '*')\n  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With Content-Type, Accept, Authorization' )\n\n  if(req.method === 'OPTIONS'){\n      res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET')\n      res.status(200).json({})\n\n  }\n  next()\n})*/\n\napp.use('/about', aboutRouter);\napp.use('/soundwave', soundWaveRouter); // catch 404 and forward to error handler\n\napp.use(function (req, res, next) {\n  next(createError(404));\n}); // error handler\n\napp.use(function (err, req, res, next) {\n  // set locals, only providing error in development\n  res.locals.message = err.message;\n  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page\n\n  res.status(err.status || 500);\n  res.render('error');\n});\nmodule.exports = app;\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./bin/www":
/*!*****************!*\
  !*** ./bin/www ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Module dependencies.\n */\n\nconst app = __webpack_require__(/*! ../app */ \"./app.js\")\nconst debug = __webpack_require__(/*! debug */ \"debug\")('get-your-sound-wave:server')\nconst http = __webpack_require__(/*! http */ \"http\")\nconst constants = __webpack_require__(/*! ../config/constants */ \"./config/constants.js\")\n\n/**\n * Get port from environment and store in Express.\n */\n\nvar port = normalizePort(constants.PORT || '3000');\napp.set('port', port);\n\n/**\n * Create HTTP server.\n */\n\nvar server = http.createServer(app);\n\n/**\n * Listen on provided port, on all network interfaces.\n */\n\nserver.listen(port);\nserver.on('error', onError);\nserver.on('listening', onListening);\n\n/**\n * Normalize a port into a number, string, or false.\n */\n\nfunction normalizePort(val) {\n  var port = parseInt(val, 10);\n\n  if (isNaN(port)) {\n    // named pipe\n    return val;\n  }\n\n  if (port >= 0) {\n    // port number\n    return port;\n  }\n\n  return false;\n}\n\n/**\n * Event listener for HTTP server \"error\" event.\n */\n\nfunction onError(error) {\n  if (error.syscall !== 'listen') {\n    throw error;\n  }\n\n  var bind = typeof port === 'string'\n    ? 'Pipe ' + port\n    : 'Port ' + port;\n\n  // handle specific listen errors with friendly messages\n  switch (error.code) {\n    case 'EACCES':\n      console.error(bind + ' requires elevated privileges');\n      process.exit(1);\n      break;\n    case 'EADDRINUSE':\n      console.error(bind + ' is already in use');\n      process.exit(1);\n      break;\n    default:\n      throw error;\n  }\n}\n\n/**\n * Event listener for HTTP server \"listening\" event.\n */\n\nfunction onListening() {\n  var addr = server.address();\n  var bind = typeof addr === 'string'\n    ? 'pipe ' + addr\n    : 'port ' + addr.port;\n  debug('Listening on ' + bind);\n}\n\n\n//# sourceURL=webpack:///./bin/www?");

/***/ }),

/***/ "./config/constants.js":
/*!*****************************!*\
  !*** ./config/constants.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar devConfig = {};\nvar testConfig = {};\nvar prodConfig = {};\nvar defaultConfig = {\n  PORT: process.env.PORT || 3000\n};\n\nfunction envConfig(env) {\n  switch (env) {\n    case 'development':\n      return defaultConfig;\n\n    case 'test':\n      return testConfig;\n\n    default:\n      return prodConfig;\n  }\n}\n\nexports[\"default\"] = _objectSpread({}, defaultConfig, envConfig(\"development\"));\n\n//# sourceURL=webpack:///./config/constants.js?");

/***/ }),

/***/ "./models/about-model.js":
/*!*******************************!*\
  !*** ./models/about-model.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n//# sourceURL=webpack:///./models/about-model.js?");

/***/ }),

/***/ "./models/soundWave-model.js":
/*!***********************************!*\
  !*** ./models/soundWave-model.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n//# sourceURL=webpack:///./models/soundWave-model.js?");

/***/ }),

/***/ "./routes/about.js":
/*!*************************!*\
  !*** ./routes/about.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar aboutModel = __webpack_require__(/*! ../models/about-model */ \"./models/about-model.js\");\n/* GET about page. */\n\n\nrouter.get('/', function (req, res, next) {\n  res.status(200).json({\n    message: \"'About' data was fetched\"\n  });\n});\nrouter.post('/', function (req, res, next) {\n  res.status(200).json({\n    message: \"This is a temporary 'about' data, until DB is designed and then data will be fetched form db\"\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/about.js?");

/***/ }),

/***/ "./routes/soundWave.js":
/*!*****************************!*\
  !*** ./routes/soundWave.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar soundWaveModel = __webpack_require__(/*! ../models/soundWave-model */ \"./models/soundWave-model.js\");\n\nrouter.get('/', function (req, res, next) {\n  res.status(200).json({\n    message: \"Waveform data was fetched\"\n  });\n});\nrouter.post('/', function (req, res, next) {\n  var soundWave = {\n    filename: req.body.filename,\n    format: req.body.format\n  };\n  console.log(soundWave);\n  res.status(201).json({\n    message: \"This is temporary 'waveform' data created until DB is designed and data fetched from the DB\",\n    soundWave: soundWave\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/soundWave.js?");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"assert\");\n\n//# sourceURL=webpack:///external_%22assert%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"debug\");\n\n//# sourceURL=webpack:///external_%22debug%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http-errors\");\n\n//# sourceURL=webpack:///external_%22http-errors%22?");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongodb\");\n\n//# sourceURL=webpack:///external_%22mongodb%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"multer\");\n\n//# sourceURL=webpack:///external_%22multer%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"stream\");\n\n//# sourceURL=webpack:///external_%22stream%22?");

/***/ })

/******/ });
