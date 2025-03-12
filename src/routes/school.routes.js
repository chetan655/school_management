const express = require("express");
const { addSchool, listSchools } = require("../controllers/school.controller");

const router = express.Router();

router.route("/listSchools").get(listSchools);

router.route("/addSchool").post(addSchool); // -> this route must be secured, only authenticated users can access it

module.exports = router;
