const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")


async function authMiddleware(req, res, next) {

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Token not found" })
    }
    try {
        const isTokenValid = await blacklistModel.findOne({ token })
        if (isTokenValid) {
            return res.status(401).json({ message: "Token is blacklisted" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(400).json({ message: "invalid credetials" })
        }
        req.user = decoded
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" })
    }


}
module.exports = authMiddleware