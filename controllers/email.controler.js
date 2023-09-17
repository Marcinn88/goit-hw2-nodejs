const emailService = require('../services/email.service')

const send = async (req, res) => {
try { 
    const result = await emailService.send(req.body)
    return res.json({
        status: "success",
        data: result,
        message: "Email sent succesfully"
    })
} catch (error){
    return res.status(400).json({
        status: "error",
        data: error,
        message: "Failed to send an email."
    })

}

}

module.exports = {
    send
}