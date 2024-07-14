const multer = require("multer");
const uuid = require("uuid");

const storage = multer.diskStorage({
   filename: (req, file, cb) => {
      cb(null, `${file.originalname}${uuid.v4()}`);
   },
});

const upload = multer({ storage });

module.exports = upload;
