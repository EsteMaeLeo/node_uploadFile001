const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const PORT = process.env.PORT || 9500;

const app = express();

app.get("/", (req, res) => {
  console.log("test upload");
  res.sendFile(path.join(__dirname, "index.html"));
});

//app.get("/", function (req, res) {
//  res.send("Hello World");
//});

app.post("/upload", fileUpload({ createParentPath: true }), (req, res) => {
  const files = req.files;
  console.log(files);
  console.log("test upload");
  return res.json({ status: "logged", message: "logged" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
