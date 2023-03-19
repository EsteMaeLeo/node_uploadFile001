const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const filesSizeLimiter = (req, res, next) => {
  const files = req.files;

  const filesOverLimi = [];
  console.log(FILE_SIZE_LIMIT);

  //Which files over the limit
  Object.keys(files).forEach(key => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      filesOverLimi.push(files[key].name);
    }
  });

  if (filesOverLimi.length) {
    const properVerb = filesOverLimi.length > 1 ? "are" : "is";

    const sentence =
      `Upload Failed. ${filesOverLimi.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replaceALL(
        ",",
        ", "
      );

    const message =
      filesOverLimi.length < 3
        ? sentence.replace(",", " and")
        : sentence.replace(/,(?=[^,]*$)/, " and");

    return res.status(413).json({ status: "error", message });
  }

  next();
};

module.exports = filesSizeLimiter;
