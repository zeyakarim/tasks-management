const app = require("./app/app");
require("dotenv").config();

let server;
server = app.listen(process.env.PORT, () => {
  console.log(
    `PID: ${process.pid}, Now browse to 'http://localhost:${process.env.PORT}'`,
  );
});