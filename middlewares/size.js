const jimp = require('jimp')

const TMP_DIR = "../tmp"
const AVATAR_DIR = "../public/avatars/"

const setSize = async (req, res, next) => {
const image = await jimp.read(TMP_DIR)
await image.resize(250, 250)
await image.write(AVATAR_DIR)
}

module.exports = {
    setSize
}