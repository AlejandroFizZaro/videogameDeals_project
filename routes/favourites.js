// http://localhost:3000/favourites/
import controllerFavourites from "../controllers/favourites.js";
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Favourite menu");
});

router.post("/:id/add/:game", (req, res) => {
	const user_id = req.params.id;
	const game_id = req.params.game;
	controllerFavourites.add(user_id, game_id);
});

// TODO: Only during dev time. Later on, remove this router method
router.get("/create", (req, res) => {
	controllerFavourites.createFavouriteDb();
	res.send(
		"Original favourites database created, remember that this is just for testing. Your project should have modificable, persistant data"
	);
});

export default router;
