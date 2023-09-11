const Users = require('../models/users.model');

const getUser = async (userId) => {
    return Users.find(userId);
};

const getLogout = async (userId) => {
    const user = await Users.findOne({ _id: userId });
    if (!user) {
      res.json({
        status: "Unauthorized",
        code: 401,
        data: {
          message: "Not authorized"
        }
    })
    }
    await Users.findOneAndUpdate({ _id: userId }, { token: null });
    return user;
  };

// const updateAvatar = async (id, avatarURL) => {
//    return Users.findOneAndUpdate({ _id: id }, { avatarURL }, {
//         new: true,
//     })
// };
module.exports = {
    getUser,
    getLogout,
    // updateAvatar
}