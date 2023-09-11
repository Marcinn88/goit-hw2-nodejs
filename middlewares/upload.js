const multer = require("multer");
const config = require("../config/config");

const upload = multer ({
    dest:config.UPLOADS_PATH,
    });

module.exports = (fieldName) => upload.single(fieldName);

