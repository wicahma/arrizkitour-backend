const multer = require("multer");
const fs = require("fs");

const multers = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../../public/images`);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File deleted");
    }
  });
};

module.exports = { multers, deleteFile };
