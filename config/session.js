const session = require("express-session");
const connectMongo = require("connect-mongo");
const MongoStore = connectMongo.default || connectMongo;

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI_WRITE,
    dbName: "DB_23IT011",
    collectionName: "sessions",
    ttl: 60 * 60,
    autoRemove: "interval",
    autoRemoveInterval: 10,
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000,
  },
});
