const { urlAlphabet } = require('nanoid');
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

const verify = async (token) => {
  const user = await Users.findOne({ verificationToken: token });
  if (user) {
    return user
  }
  else {
    return null
  }
}

module.exports = {
  getUser,
  getLogout,
  verify
}