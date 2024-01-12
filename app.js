require("dotenv").config();
const db = require("./config/db");
// db();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const errorHandler = require("./middlewares/errorHandler");
const IndexRoute = require("./routes/index");
const ClientSideRoute = require("./routes/clientSide");
const ServerSideRoute = require("./routes/serverSide");
const CookieRoute = require("./routes/cookie");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 },
  })
);

app.use("/api/field", IndexRoute);
app.use("/api/auth/client", ClientSideRoute);
app.use("/api/auth/server", ServerSideRoute);
app.use("/api/cookie", CookieRoute);

app.use(errorHandler);

app.listen(port, () => console.log(`http://localhost:${port}`));
