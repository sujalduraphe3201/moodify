const userModel = require("../models/user.model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const blacklistModel = require("../models/blacklist.model.js")


async function registerUser(req, res) {

    const { username, password, email } = req.body

    const isAlreadyExist = await userModel.findOne({
        $or: [{ email }, { username }]
    })
    if (isAlreadyExist) {
        return res.status(400).json({ message: "Username or email already exist" })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    if (!hashPassword) {
        return res.status(500).json({ message: "Something went wrong" })
    }
    const user = await userModel.create({
        username, password: hashPassword, email
    })
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.cookie("token", token)


    res.status(201).json({
        message: "User registered successfully", user: {
            id: user._id,
            username: user.username,
            email: user.email
        }, token
    })
}

async function loginUser(req, res) {

    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [{ email }, { username }]
    }).select("+password")
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const comparePassword = bcrypt.compare(password, user.password)
    if (!comparePassword) {
        return res.status(400).json({ message: "Invalid Credentials" })
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "3d" })
    res.cookie("token", token)

    res.status(201).json({
        message: "User logged in successfully", user: {
            id: user._id,
            username: user.username,
            email: user.email
        }, token
    })
}

async function getMe(req, res) {
    const userId = req.user.id
    const user = await userModel.findById(userId).select("-password")
    res.status(200).json({
        message: "User fetched successfully",
        user
    })

}

async function logoutUser(req, res) {
    const token = req.cookies.token

    res.clearCookie("token")
    await blacklistModel.create({ token })
    res.status(200).json({ message: "User logged out successfully", })

}

module.exports = { registerUser, loginUser, getMe, logoutUser }