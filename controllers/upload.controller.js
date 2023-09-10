const path = require("node:path");
const fs = require('node:fs').promises;
const config = require('../config/config')
const IMAGES_DIR = path.join(process.cwd(), 'images');

const uploadFile = async (req, res, next) => {
    const { description } = req.body;
    const { path: temporaryName, originalname } = req.file;
    const fileName = path.join(config.IMAGES_PATH, originalname);
    fs.rename(temporaryName, fileName).then(() => {
      console.log('File uploaded')
      return res.json({ 
        description, 
        message: 'Plik załadowany pomyślnie', 
        status: 200 });
    }).catch((err) => {
      console.log(err)
      fs.unlink(temporaryName).then(()=>{
        console.log("Error encountered, file deleted")
        next(err)
      }).catch((error)=>{
        console.log(error)
        next(error)
      });
      });

  };

module.exports = {
    uploadFile
}