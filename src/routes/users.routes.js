const express = require("express");
const router = express.Router();

// Controllers
import controller from  "../controllers/users.controller.js"

router.post("/registro", controller.agregarUsuario);
router.post("/login",)
module.exports = router;
