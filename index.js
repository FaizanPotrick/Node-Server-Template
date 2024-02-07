require("dotenv").config({
  path: ".env",
});
const connectDB = require("./config/db");
const app = require("./app");
const { PORT } = require("./config");

// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is listening on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("MongoDB connection failed !!!", err);
//   });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
