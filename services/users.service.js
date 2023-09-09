const User = require('../models/users.model');

const getUser = async (userId) => {
    return User.findOne({ owner: userId });
};

module.exports = {
    getUser
}