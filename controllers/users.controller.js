const usersServices = require('../services/users.service')


const signup = async (req, res, next) => {
    try {
        const { body } = req;
        const results = await usersServices.signup(body);
        res.json({
            status: "succes",
            code: 200,
            data: {
                contact: results,
            },
        });
    } catch (e) {
        console.error(e)
        next(e)
    }
};


module.exports = {
    signup
};