const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const v1AuthRouter = require("./v1/routes/authRoutes");
const v1SwaggerDocs = require("./v1/docs/swagger");

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config(); 

// Middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Routes
app.use("/api/v1/auth", v1AuthRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  v1SwaggerDocs(app, PORT);
});
