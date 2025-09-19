import sql from "../functions/db/dbConnect.js";

let createFavouriteDb = async () => {
	// remove this line below before launch
	await sql`DROP TABLE IF EXISTS favourites`;
	await sql`CREATE TABLE IF NOT EXISTS favourites ( id SERIAL PRIMARY KEY, game_id VARCHAR(255) NOT NULL, user_id SERIAL references users(id) NOT NULL, UNIQUE (game_id, user_id))`;
};

let deleteTable = async () => {
	await sql`DROP TABLE IF EXISTS  favourites`;
};

let getAllFavouritesFromAllUsers = async () => {
	await sql`SELECT id, title, description from favourites`;
};
let getById = async (fk_user_id) => {
	await sql`SELECT id, title, description from favourites WHERE user_id = ${fk_user_id}`;
};

let getByUserIdByGame = async (fk_user_id, favourite_id) => {
	await sql`SELECT id, title, description from favourites WHERE user_id = ${fk_user_id} and id = ${favourite_id}`;
};

// Idea: Loop through array of selected favs
let removeMultipleFavouriteFromUser = async (favourites) => {
	for (favourite in favourites) {
		await sql`DELETE FROM favourite WHERE id = ${favourite.id}`;
	}
};

let addFavourite = async (game_id, user_id) => {
	await sql`INSERT INTO favourites (game_id), VALUES(${game_id}) WHERE userId = ${user_id} ON CONFLICT DO NOTHING`;
};

export default {
	createFavouriteDb,
	deleteTable,
	getAllFavouritesFromAllUsers,
	getById,
	getByUserIdByGame,
	removeMultipleFavouriteFromUser,
	addFavourite,
};
