const mongoose = require("mongoose")
function dbConnect() {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("Database connected"))
        .catch((err) => console.log(err))
}

module.exports = dbConnect;