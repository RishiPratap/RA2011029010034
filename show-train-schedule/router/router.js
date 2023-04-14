const express = require("express");
const router = express.Router();
const { getTrainDetails } = require("../controllers/controller");

router.get("/", getTrainDetails);

module.exports = router;