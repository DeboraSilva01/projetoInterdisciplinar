const express = require("express");
const { register } = require("../controllers/register");

const router = express.Router();

router.post("/usuarios", register);

module.exports = router;