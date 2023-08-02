const express = require("express");
const app = express();
const cors = require("cors");
const chalk = require("chalk");

const authorizedAPIs = [
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
];

const options = (req, callback) => {
  const isExist = authorizedAPIs.find(api => api === req.headers.origin);
  if (!isExist)
    return callback(
      chalk.redBright(
        `CORS Error: the API ${req.headers.origin} is an Unauthorized API`
      ),
      {
        origin: false,
      }
    );
  callback(null, { origin: true });
};

app.use(cors(options));

module.exports = app;

// const exprees = require("express")
// const app = exprees()
// const cors = require("cors")
// const chalk = require("chalk")

// const api=[ "http://127.0.0.1:3000", "http://127.0.0.1:5500" ]
// const options = (req,res)=>{
//   const isExist= api.find(item=>item === req.headers.origin)
//   if (!isExist) return res(chalk.redBright(`Cors eroor: the api ${req.headers.origin}`  ))
// }
// app.use(cors({
//   origin : [ "http://127.0.0.1:3003", "http://127.0.0.1:5505" ],
//   code:200
// }))


// module.exports = app;