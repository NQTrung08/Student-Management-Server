const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const initRoute = require("./src/Routes");
const connect = require("./src/Config/db/index");
const cookieParser = require("cookie-parser");
dotenv.config();
const { app: {url}} = require('./src/Config/app/index')
const app = express();
app.use(cors({
  origin: "*"
}));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// })
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Swagger configuration
require('./src/Config/swagger/index')(app);

// init router
initRoute(app);

// handle error

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal Server Error',
  });
  
});

// connect database
connect();

const port = process.env.DEV_APP_PORT;
app.listen(port, (err) => {
	if (err) console.log(err);
	console.log(`Server listening in ${url}`);
	console.log(`API DOCUMENTS running in  ${url}/api-docs`);
});
