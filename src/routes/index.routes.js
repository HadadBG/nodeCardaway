const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex,getPostales } = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/getPostales",getPostales)

module.exports = router;
