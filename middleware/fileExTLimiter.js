const path = require("path");

const fileExtLimeter = allowedExtArray => {
  return (req, res, next) => {
    const files = req.files;
    console.log(files);
    const fileExtensions = [];
    Object.keys(files).forEach(key => {
      fileExtensions.push(path.extname(files[key].name));
    });

    const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext));

    if (!allowed) {
      const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`;

      return res.status(422).json({ status: "error", message });
    }

    next();
  };
};

module.exports = fileExtLimeter;
