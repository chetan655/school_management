require("dotenv").config();
const express = require("express");
const ApiError = require("./utils/ApiError");

const app = express();

app.use(express.json());

const port = process.env.PORT || 8000;
// console.log("first", process.env.PORT);

const router = require("./routes/school.routes");

app.use("/api/v1", router);

// const { sequelize } = require("./models");
// sequelize
//     .authenticate()
//     .then(() => console.log("Connected to MySQL successfully"))
//     .catch((err) => console.error("MySQL Connection Error:", err));
// console.log(require("./models"));

// gloabl error handler
app.use((error, req, res, next) => {
    if (error instanceof ApiError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errors: error.errors,
        });
    } else {
        res.status(error.status || 500).json({
            success: error.success || false,
            message: error.message || "Something went wrong.",
            error: error || [],
        });
    }
});

app.listen(port, (req, res, next) => {
    console.log(`server listening on port : ${port}`);
});
