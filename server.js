const express = require("express");
const connectDB = require("./db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/register", require("./routes/registration"));
app.use(`/${process.env.SECRET_ROUTE}`, require("./routes/hidden"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
