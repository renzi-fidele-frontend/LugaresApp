const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

// TODO: Investigar como definir o diretório da foto ao reutilizar este middleware

const storage = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, "uploads");
   },
   filename: (req, file, callback) => {
      let nomeAleatorio = uuid.v1();
      let ext = path.extname(file.originalname);
      callback(null, nomeAleatorio + ext);
   },
});

// 1 Kb => 1000 Bytes
const fileUpload = multer({ storage, limits: { fileSize: 500000 } });

module.exports = fileUpload;
