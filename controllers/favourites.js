import sql from "../functions/db/dbConnect.js";

let createFavouriteDb = async () => {
	console.log("Creating fake db...");

	// remove this line below before launch
	await sql`DROP TABLE IF EXISTS favourites`;
	console.log("Old favourite games table was removed...");

	await sql`CREATE TABLE IF NOT EXISTS favourites ( id SERIAL PRIMARY KEY, title VARCHAR(255), description VARCHAR(1000), user_id SERIAL references users(id))`;
	console.log("Favourite games table was created...");
};

let getAllFavouritesFromAllUsers = async () => {
	await sql`SELECT id, title, description from favourites`;
};
let getAllFavouritesByUserBasicData = async (fk_user_id) => {
	await sql`SELECT id, title, description from favourites WHERE user_id = fk_user_id`;
};

let getOneFavouriteByUser = async (fk_user_id, favourite_id) => {
	await sql`SELECT id, title, description from favourites WHERE user_id = fk_user_id and id = favourite_id`;
};

// TODO: Check if, with only one method we can do it in an efficient way, think so
let removeOneFavouriteFromUser = async (fk_user_id, favourite_id) => {
	await sql`DELETE from favourites where user_id = fk_user_id and id = favourite_id`;
};
// Idea: Loop through array of selected favs
let removeMultipleFavouriteFromUser = async (favourites) => {
	const favourite = (favourites = "tbd");
	for (favourite in favourites) {
		await sql`DELETE FROM favourite WHERE id = ${favourite.id}`;
	}
};

let addFavourite = async () => {
	await sql`INSERT INTO favourites (game), VALUES(game_id) WHERE userId = user_id`;
};

export default {
	createFavouriteDb,
	getAllFavouritesFromAllUsers,
	getAllFavouritesByUserBasicData,
	getOneFavouriteByUser,
	removeOneFavouriteFromUser,
	removeMultipleFavouriteFromUser,
	addFavourite,
};
