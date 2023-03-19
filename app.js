const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const filesPayloadExists = require("./middleware/filesPayloadExists");
const fileExtLimeter = require("./middleware/fileExTLimiter");
const filesSizeLimiter = require("./middleware/fileSizeLimiter");

const PORT = process.env.PORT || 9500;

const app = express();

app.get("/", (req, res) => {
  console.log("test upload");
  res.sendFile(path.join(__dirname, "index.html"));
});

//app.get("/", function (req, res) {
//  res.send("Hello World");
//});

app.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimeter([".png", "jpg", "jpeg"]),
  filesSizeLimiter,
  (req, res) => {
    const files = req.files;
    console.log(files);
    console.log("test upload");
    return res.json({ status: "logged", message: "logged" });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
