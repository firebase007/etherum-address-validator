const express = require("express");
const router = express.Router();

//get controller
const addressCaseController = require("../addressCase");

router.post("/convert",  addressCaseController.convert);
router.get("/verify/checksum",  addressCaseController.verifyChecksum);

module.exports = router;