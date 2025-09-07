// http://localhost:3000/favourites/
import controllerFavourites from "../controllers/favourites.js";
import express from "express";
import { param } from "express-validator";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Favourite menu");
});
// TODO: Set controller
router.get("/list/:id", (req, res) => {
	const id = req.params.id;
	controllerFavourites.getById(id);
});

// TODO: Set controller
router.get("/list/:id/:game", (req, res) => {
	const id = req.params.id;
	const game = req.params.game;
	controllerFavourites.getByUserIdByGame(id, game);
});

// Developer routes. The ideal way would be to check the user role (i.e. Company admin)
// TODO: When implementing this kind of checks, check the user role

router.get("/create", (req, res) => {
	controllerFavourites.createFavouriteDb();
	res.send("Favourites database created");
});

router.get("/delete", (req, res) => {
	controllerFavourites.deleteTable();
	res.send("Favourite database removed.");
});

router.post(
	"/:id/add/:game",
	[param("id").notEmpty().isInt(), param("game").notEmpty().isInt()],
	(req, res) => {
		const user_id = req.params.id;
		const game_id = req.params.game;
		controllerFavourites.add(user_id, game_id);
	}
);

export default router;
