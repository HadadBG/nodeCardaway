const express = require("express");
const router = express.Router();

// Controllers
import controller from  "../controllers/admin.controller.js"

router.get("/admin", controller.renderAdmin);

module.exports =  router;