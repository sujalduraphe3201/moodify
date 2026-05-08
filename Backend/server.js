require("dotenv").config();
const app = require("./src/app");
const dbConnect = require("./src/utils/database");
const authRoutes = require("./src/routes/auth.routes");

dbConnect()

app.use("/api/auth", authRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
})