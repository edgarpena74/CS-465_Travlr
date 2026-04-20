// Import Mongoose library to allow us to connect with mongoDB
const mongoose = require("mongoose");

// Set database host to environment variable DB_HOST
// or use locahost 127.0.0.1
const host = process.env.DB_HOST || "127.0.0.1";

/* 
Define the URI indentifier for the database.
------------------------------------------------------------
Creates the MongoDB connection URI using the host and travlr database.
*/
const dbURI = `mongodb://${host}/travlr`;

// Readline handles input and outputs
const readline = require("readline");
//const { setTimeout } = require('timers/promises');

/* 
Build the connection string and set the connection timeout.
-----------------------------------------------------------
Timeout is in milliseconds.
*/
// const connect = () => {
//     setTimeout(() => mongoose.connect(dbURI, {}), 10000);
// };

const connect = () => {
  // mongoose.connect(dbURI, {});
  mongoose.connect(dbURI, {});
};
//--------------------------
// Monitor connection events
//--------------------------
mongoose.connection.on("connected", () => {
  // Outputs that mongoose is connected at specific URI
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on("error", (err) => {
  // Output error message if mongoose failed to connect with the URI
  console.log(`Mongoose connection error: `, err);
});

mongoose.connection.on("disconnected", () => {
  // Outputs message when mongoose gets disconnected
  console.log("Mongoose disconnected");
});

// Windows specific listener
if (process.platform === "win32") {
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  r1.on("SIGINT", () => {
    process.emit("SIGINT");
  });
}

/* 

Configure for Graceful Shutdown.

*/
const gracefulShutdown = (msg) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
  });
};

// Event listeners to process graceful shutdowns
// Shutdown invoked by nodemon signal
process.once("SIGUSR2", () => {
  // Pass message through the 'msg' param from the gracefulShutdown definition
  gracefulShutdown("Nodemon restart");
  process.kill(process.pid, "SIGUSR2");
});

// Shutdown invoked by app termination
process.on("SIGINT", () => {
  gracefulShutdown("App termination");
  process.exit(0);
});

// Shutdown invoked by conainer termination
process.on("SIGTERM", () => {
  gracefulShutdown("App shutdown");
  process.exit(0);
});

// Make initial connection DB
connect();

// Import Mongoose schema
require("./travlr");
module.exports = mongoose;
