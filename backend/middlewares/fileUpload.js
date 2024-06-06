const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

const storage = multer.diskStorage({
   //dest: "uploads",
   //limits: { fileSize: 500000 }, // 1000 bytes => 1kb
   destination: (req, file, callback) => {
      callback(null, "uploads");
   },
   filename: (req, file, callback) => {
      let nomeAleatorio = uuid.v1();
      let ext = path.extname(file.originalname);
      callback(null, nomeAleatorio + ext);
   },
});

const fileUpload = multer({ storage });

module.exports = fileUpload;
