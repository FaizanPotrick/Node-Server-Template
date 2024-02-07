const express = require("express");
const cors = require("cors");
const { CORS_ORIGIN, SESSION_SECRET } = require("./config");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const errorHandler = require("./middlewares/errorHandler.middleware");
const IndexRoute = require("./routes/index.routes");
const ClientRouter = require("./routes/client.routes");
const CookieRouter = require("./routes/cookie.routes");
const ServerRouter = require("./routes/server.routes");

const app = express();

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 }, // 1 minute
  })
);

app.use("/api/field", IndexRoute);
app.use("/api/client", ClientRouter);
app.use("/api/server", ServerRouter);
app.use("/api/cookie", CookieRouter);

app.use(errorHandler);

module.exports = app;
