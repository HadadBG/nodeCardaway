const express = require("express");
const router = express.Router();
import passport from "passport";
// Controllers
import controller from "../controllers/users.controller.js";

router.post("/registro", controller.agregarUsuario);
router.post("/login", controller.logIn);
router.get("/envio", controller.renderEnvio);
router.get("/prueba", controller.prueba);
router.get("/logout", controller.logOut);
router.get("/perfil",controller.renderPerfil);
module.exports = router;
