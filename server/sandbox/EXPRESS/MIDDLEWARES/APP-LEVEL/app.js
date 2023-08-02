const express = require("express");
const app = express();
const chalk = require("chalk");

// app.use((req, res, next) => {
//   console.log(chalk.yellowBright("in first app.use!"));
//   res.send("in app.use!!!");
// });

// app.use("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in second app.use!"));
//   res.send({ message: "i ended the req res cycle!!!!" });
// });

// const fn = (path = "/", cb, ...middleware) => {};

/****** app.use next *****/
// app.use(
//   "/",
//   (req, res, next) => {
//     console.log(chalk.yellowBright("one"));
//     next();
//   },
//   (req, res, next) => {
//     console.log(chalk.redBright("two"));
//     next();
//   },
//   (req, res) => {
//     console.log(chalk.magentaBright("three"));
//     res.send("end of cycle!");
//   }
// );

/***** express app middleware exe *****/

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("first CB");
//     req.user = { first: "jon", last: "dho" };
//     next();
//   },
//   (req, res) => {
//     console.log("second CB");
//     res.send(req.user);
//   }
// );
// app.use("/user",(req,res,next)=>{
//   console.log({massge:"Cb one"});
//   req.user ={
//     first: "shauli",
//     last:"aharon"
//   };
//   next();
// } , (req,res)=>{
//   console.log({massge:"Cb tow"});

// res.send(req.user)
//   })

/****** middleware method beside app.use *****/
// app.get("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in get method!!!"));
//   // res.send("in get!");
//   next()
// });

// לעולם לא יגיע לכאן כי הוא כבר מיורת במטודה למעלה ויש החזרה של תשובה
// app.get("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in get second method!!!"));
//   res.send("in get second!");
// });

// app.post("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in post method!!!"));
//   res.send("in post");
// });

// app.put("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in put method!!!"));
//   res.send("in put");
// });

// app.patch("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in patch method!!!"));
//   res.send("in patch");
// });

// app.delete("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in delete method!!!"));
//   res.send("in delete");
// });

/***** response *****/
/***** res.send *****/
// app.use("/", (req, res) => {
//   res.send("testing!!!!");
// res.send({ key: "value" });
//   res.send(["one", "two", "three"]);
//   res.send(false); // ממיר למרוזת תווים
//   res.send(503); // הוא חושב שאני מנסה לשלוח סטאטוס קוד
//   res.send(null);
// });
// app.use("/", (req, res) => {
//   res.send("testing!!!!");
// res.send({ key: "value" });
//   res.send(["one", "two", "three"]);
//   res.send(false); // ממיר למרוזת תווים
//   res.send(503); // הוא חושב שאני מנסה לשלוח סטאטוס קוד
//   res.send(null);
// });
app.use(express.json())
app.use(express.text())
// app.get("/headers", (req, res) => {
//   console.log("in headers")
//   const headers= req.headers
//   res.send(headers);

// });
// app.get("/params/:id", (req, res) => {
//   console.log("in params")
//   const params= req.params
//   res.send(params);
// ;
// });
// app.get("/query", (req, res) => {
//   console.log("in query")
//   const query= req.query
//   res.send(query);
// ;
// });
// app.get("/custom", (req, res) => {
//   console.log("in custom")
//   req.custom={name:"Shauli",lastName:"Aharon"}
//   const custom = req.custom;
//   res.send(custom);
// ;
// });

// /////////////////////
// app.use((req, res) => {
// res.json({ key: "value" });
// res.json("text");
// res.json(false);
// });

/***** res.status *****/
// app.use((req, res) => {
//   console.log("in req status!");
//   res.status(401).send("end cycle!");
// });

/***** request *****/

// app.use("/headers", (req, res) => {
//   const headers = req.headers;
//   res.send(headers);
// });

// app.use("/params/:david", (req, res) => {
//   const params = req.params;
//   res.send(params);
// });

// app.use("/query-params", (req, res) => {
//   const query_params = req.query;
//   res.send(query_params);
// });

// const test = (req, res, next) => {
//   console.log("in req body!!!!");
//   const body = req.body;
//   // res.send(body);
//   next();
// };

// app.use(test);

app.post("/post",(req,res)=>{
console.log("in post");
res.send(req.body)

})




const PORT = 9191;
app.listen(PORT, () => {
  console.log(chalk.blueBright(`Listening on :http://localhost:${PORT}`));
});
