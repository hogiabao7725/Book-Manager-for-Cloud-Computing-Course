const mongoose = require("mongoose");

// Users have restricted privileges, so Mongoose must not try to create collections/indexes
const options = { autoIndex: false, autoCreate: false };

const readConn = mongoose.createConnection(process.env.MONGO_URI_READ, options);
const writeConn = mongoose.createConnection(
  process.env.MONGO_URI_WRITE,
  options,
);

readConn.on("connected", () =>
  console.log("READ connection (user_read_23IT011) connected"),
);
writeConn.on("connected", () =>
  console.log("WRITE connection (user_write_23IT011) connected"),
);
readConn.on("error", (e) => console.error("READ connection error:", e.message));
writeConn.on("error", (e) =>
  console.error("WRITE connection error:", e.message),
);

module.exports = { readConn, writeConn };
