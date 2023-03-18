const { google } = require("googleapis");
const fs = require("fs");
require("dotenv").config();

const getAuthenticate = () => {
  const auth = new google.auth.JWT({
    email: process.env.SERVICE_ACCOUNT,
    key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: "https://www.googleapis.com/auth/drive",
  });
  return auth;
};

const uploadImageToDrive = async (file, auth, fileName) => {
  const driveService = google.drive({ version: "v3", auth });

  const fileMetadata = {
    name: file.originalname,
    parents: [fileName],
  };
  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });
  return response;
};

const deleteImageFromDrive = async (fileId, auth) => {
  const driveService = google.drive({ version: "v3", auth });
  try {
    const response = await driveService.files.delete({
      fileId: fileId,
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAuthenticate, uploadImageToDrive, deleteImageFromDrive };
