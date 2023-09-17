const nodemailer = require('nodemailer');
require('dotenv').config();

const config = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
}


const send = async ({ to, verify }) => {
const transporter = nodemailer.createTransport(config);
const maildo = to
console.log(maildo)
const mailotresci = verify
console.log(mailotresci)
const emailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject: 'Confirm your Email.',
    text: `To confirm your Email please use this link: /users/verify/:${verify}`
};
 return await transporter.sendMail(emailOptions);
}


const sendAgain = async ({ email, token }) => {
    const transporter = nodemailer.createTransport(config);
    const emailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Confirm your Email.',
        text: `To confirm your Email please use this link: /users/verify/:${token}`
    };

     return await transporter.sendMail(emailOptions);
}
    
module.exports = {
    send,
    sendAgain
}



// const send = async ({ email, verification }) => {
//     const transporter = nodemailer.createTransport(config);
//     const emailOptions = {
//         from: process.env.MAIL_USER,
//         to: email,
//         subject: 'Confirm your Email.',
//         text: verification
//     };
//      return await transporter.sendMail(emailOptions);
//     }
    