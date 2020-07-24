const express = require("express");
const router = express.Router();

// Controllers
import controller from  "../controllers/users.controller.js"

router.post("/Registro", controller.agregarUsuario);

module.exports = router;
