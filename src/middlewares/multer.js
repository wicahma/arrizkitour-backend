const multer = require("multer");
const fs = require("fs");

const multers = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}`);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};

module.exports = { multers, deleteFile };
