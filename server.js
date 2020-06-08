const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Body parser
app.use(express.json());

//Connect to DB
connectDB();

//Load Methods
const auth = require("./routes/auth");
const twit = require("./routes/twit");

app.use("/api", auth);
app.use("/api", twit);

const port = 8000;
app.listen(port, () => console.log(`Server runnig at port ${port}`));
