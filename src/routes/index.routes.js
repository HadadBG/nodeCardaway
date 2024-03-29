const express = require("express");
const router = express.Router();

// Controllers
import controller from  "../controllers/index.controller"

router.get("/", controller.renderIndex);
router.get("/getPostales",controller.getPostales)
router.get("/registro",controller.renderFormulario)

module.exports =  router;
