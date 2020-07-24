const express = require("express");
const router = express.Router();

// Controllers
import controller from  "../controllers/users.controller.js"

router.post("/agregarUsuario", controller.agregarUsuario);

module.exports = router;
