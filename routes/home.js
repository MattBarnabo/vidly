const express = require("express");
const router = require("router");

router.get("/", (req, res) => {
	res.render("index", { title: "Vidly", message: "Hello" });
});

module.exports = router;
