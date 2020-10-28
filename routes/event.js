const express = require("express");
const router = express.Router();
const { eventController } = require("../controllers");
const { jwtVerification } = require("../lib/jwt-utils");

router.post("/one", jwtVerification, eventController.one.post);
router.post("/repeat", jwtVerification, eventController.repeat.post);
router.get("/", eventController.retrieve.get);
router.delete("/", jwtVerification, eventController.delete.delete);
router.put("/", jwtVerification, eventController.participation.put);
module.exports = router;
