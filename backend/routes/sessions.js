// http://localhost:3000/sessions/
import controllerSessions from "../controllers/sessions.js";
import express from "express";
import { param, validationResult } from "express-validator";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Sessions menu");
});

// Developer routes. The ideal way would be to check the user role (i.e. Company admin)
// TODO: When implementing this kind of checks, check the user role

router.get("/delete", (req, res) => {
	controllerSessions.removeTable();
	res.send("Sessions table removed");
});

router.post("/add/:id", [param("id").notEmpty().isInt()], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const user_id = req.params.id;
	controllerSessions.add(user_id);
});

router.get("/create", (req, res) => {
	controllerSessions.createTable();
	res.send("Sessions database created.");
});

router.post("/remove/:id", [param("id").notEmpty().isInt()], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	let user_id = req.params.id;
	controllerSessions.remove(user_id);
});

export default router;
