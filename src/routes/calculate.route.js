const express = require("express");
const {
  calculateFunctionPoints,
  calculateSLOC,
} = require("../controllers/calculate.controller");
const {
  userById,
  getListConstructionProject,
} = require("../controllers/construction.controller");

const router = express.Router();

router.post("/function-points/:userId", calculateFunctionPoints);
router.post("/source-line-of-code/:userId", calculateSLOC);

router.get("/list-construction/:userId", getListConstructionProject);

router.param("userId", userById);

module.exports = router;
