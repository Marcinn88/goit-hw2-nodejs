const User = require('../models/users.model');

const signup = async (data) => {
    return User.create(data);
};

module.exports = {
    signup
}