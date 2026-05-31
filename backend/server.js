const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NEW SKILLVERSE API WORKING 🚀"
  });
});

app.listen(5000, () => {
  console.log("SERVER RUNNING ON 5000");
});
