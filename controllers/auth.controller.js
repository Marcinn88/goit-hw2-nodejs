const User = require('../models/users.model')
const fs = require('node:fs').promises;
const jimp = require('jimp')
const jwt = require('jsonwebtoken')
const userServices = require('../services/auth.service')
const emailService = require('../services/email.service')
const { token } = require('morgan')
const gravatar = require('gravatar')
const path = require("node:path");
const config = require('../config/config')
const nanoid = require('nanoid')

const signin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
  
    if (!user || !user.validPassword(password) || !user.verify) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Incorrect login, password or user is not verified',
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
      newUser.verificationToken = nanoid.nanoid()
      const to = newUser.email
      const verify = newUser.verificationToken
      await emailService.send({to, verify})
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
    console.log(user);
    console.log(req)
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

const avatar = async (req, res, next) => {
    const { user } = req
    const { description } = req.body;
    const { path: temporaryName, originalname } = req.file;
    const newName = ((user._id).toString()+'.jpeg');
    const fileName = path.join(config.IMAGES_PATH, newName).toString();
    const image = await jimp.read(temporaryName)
    await image.resize(250, 250)
    await image.write(temporaryName)
    await User.findOneAndUpdate({ _id: user.id}, { avatarURL: fileName})
    await fs.rename(temporaryName, fileName)
        .then(() => {
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

const sendAgain = async (req, res) => {
  try { 
    const  { email } = req.body
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: "error",
        message: "missing required field email",
      })
      }
    else {
      if ( user.verify || user.verificationToken==null) {
        return res.status(400).json({
          status: "error",
          message: "Verification has already been passed"
        })} 
      else {
        const email = user.email
        const token = user.verificationToken
        await emailService.sendAgain({email, token})
        return res.json({
            status: "success",
            message: "Verification email sent",
        })
      }
    }
  } catch (error){
      return res.status(400).json({
        status: "error",
        data: error,
        message: error.message
      })
    }
} 

  const verify = async (req, res) => {
    const { verificationToken } = req.params
    const user = await User.findOne({ verificationToken });
    if (!user) {
      res.status(404).json({
      status: 'Error',
      code: 404,
      message: 'User not found',
      data: 'Not found',
    })
  } else {
  await User.findOneAndUpdate ({verificationToken}, {verificationToken: null, verify: true})
  res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'Verification successful'
    },
  })}
  }


module.exports = {
    signin,
    logout,
    signup,
    current,
    avatar,
    verify,
    sendAgain
}






