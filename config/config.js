const path = require("node:path");

const getUploadsPath = () => {
return path.join(
    __dirname,
   "..", 
    "tmp"
);
};

const getImagesPath = () => {
    return path.join(__dirname,"..", "public", "avatars");
}


module.exports = {
UPLOADS_PATH: getUploadsPath(),
IMAGES_PATH: getImagesPath()
}



// const getUploadsPath = () => {
//     const now = new Date();
//     return path.join(
//         __dirname,
//        "..", 
//         "uploads",
//         now.getFullYear().toString(),
//         (now.getMonth() + 1).toString(),
//     );
//     };