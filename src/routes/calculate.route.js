const express = require("express");
const {
  calculateFunctionPoints,
  calculateSLOC,
} = require("../controllers/calculate.controller");

const router = express.Router();

router.post("/function-points", calculateFunctionPoints);
router.post("/source-line-of-code", calculateSLOC);

module.exports = router;
