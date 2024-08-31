const express = require("express");
const cors = require("cors");
const initRoute = require("./src/Routes");
const connect = require("./src/Config/db/index");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
// app.use(cors());
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

const port = process.env.PORT;
app.listen(port, (err) => {
	if (err) console.log(err);
	console.log(`Server listening in port ${port}`);
	console.log(`API DOCUMENTS running in  http://localhost:${port}/api-docs`);
});
