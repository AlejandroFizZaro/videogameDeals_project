// http://localhost:3000/users/
import express from "express";
const router = express.Router();

import controllerUser from "../controllers/users.js";

router.get("/", (req, res) => {
	res.send("User menu");
	controllerUser.getAll();
});

router.get("/init", (req, res) => {
	controllerUser.createFakeDb();
});
router.get("/create", (req, res) => {
	controllerUser.createUserDb();
	res.send(
		"Original users database created, remember that this is just for testing. Your project should have modificable, persistant data"
	);
});

router.post("/new", (req, res) => {
	const data = req.params.data;
	controllerUser.add(data);
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	controllerUser.getById(id);
});

router.post("/login", (req, res) => {
	let data = req.body;
	controllerUser.login(data);
	res.send("JWT printed!");
});

export default router;
