require('./initalizer')
require('./mongoose/init')

// NotImplementedError: node:cluster is not yet implemented in Bun.
// Track the status & thumbs up the issue: https://github.com/oven-sh/bun/issues/2428 

// import chalk from "chalk";
// const cluster = require('cluster');
// const numCPUs = require('node:os').availableParallelism();
// const process = require('node:process');


// if (cluster.isPrimary) {
//   console.log(chalk.magenta("[CLUSTER]") + chalk.green(" Primary PID: ", process.pid));
// 
//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
// 
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(chalk.magenta("[CLUSTER]") + chalk.red(` Worker ${worker.process.pid} died`));
//   });
// } else {
  
const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const session = require("express-session");
const fileUpload = require('express-fileupload')
const path = require("path");
const MongoStore = require("connect-mongo");
const PORT = process.env.port;
import chalk from "chalk";

app.use(require("cors")());
app.set("view engine", require("ejs"));
app.use(
  session({
    secret: process.env.session,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: process.env.atlas,
    }),
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './files/tmp/',
  limits: { fileSize: 50 * 1024 * 1024 }
}));

app.use("/api", require("./routers/api"));
app.use("", require("./routers/index"));
app.use('/dashboard', require('./routers/dashboard'))
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/files", express.static(path.join(__dirname, "files")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));



//app.use((req, res, next) => {
//  res.status(404).render(__dirname + "/views/errors/404.ejs", {});
// }); // 404 Duck not found

app.listen(PORT, () => {
  console.log(chalk.blue("[EXPRESS]") + chalk.green(" Running on port:", PORT));
});
//  console.log(chalk.magenta("[CLUSTER]") + chalk.green(" Worker ", process.pid, " started"));
// }