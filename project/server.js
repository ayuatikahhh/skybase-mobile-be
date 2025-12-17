const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/staff", require("./routes/staff.routes"));
app.use("/aircraft", require("./routes/aircraft.routes"));
app.use("/flights", require("./routes/flight.routes"));


app.listen(5000, () => console.log("Server running on port 5000"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Terjadi kesalahan pada server",
    error: err.message
  });
});
