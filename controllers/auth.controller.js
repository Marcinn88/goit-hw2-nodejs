const User = require('../models/users.model')
const jwt = require('jsonwebtoken')
const userServices = require('../services/auth.service')
const { token } = require('morgan')
const gravatar = require('gravatar')

const signin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
  
    if (!user || !user.validPassword(password)) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Incorrect login or password',
        data: 'Bad request',
      })
    }
  
    const payload = {
      id: user.id,
      username: user.username,
    }
    const secret = process.env.SECRET
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    return res.json({
      status: 'success',
      code: 200,
      data: {
        token,
      },
    })
}

const signup = async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email }).lean();
    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email is already in use',
        data: 'Conflict',
      });
    }
    try {
      const newUser = new User({ email });
      newUser.setPassword(password);
      newUser.avatarURL = gravatar.url(email, {s: '100', r: 'x', d: 'robohash'}, false)
      await newUser.save();
      res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          message: 'Registration successful',
        },
      });
    } catch (error) {
      next(error);
    }
}
const logout = async (req, res) => {
  const { _id: userId } = req.user;
  await userServices.getLogout(userId);
  res.status(204).json({ status: "204 No Content" });
};

const current = async (req, res, next) => {
  try {
    const {user} = req;
    if (user) {
      res.json({
        status: "succes",
        code: 200,
        data: {
          email: user.email,
          subscription: user.subscription,
        }
    })
    }
    else {
    res.json({
      status: "Unauthorized",
      code: 401,
      data: {
        message: "Not authorized"
      }
  })
}
  } catch (error) {
    res.json({
      status: "Error",
      code: 404,
      data: {
        message: "Error"
      }
  })
  }
};

const avatar = async (req, res) => {
  //TODO: dodac wgrywanie nowego awatara i podmiane z linkiem w user.avararURL
};

module.exports = {
    signin,
    logout,
    signup,
    current,
    avatar
}






