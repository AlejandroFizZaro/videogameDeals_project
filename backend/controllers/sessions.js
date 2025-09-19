import sql from "../functions/db/dbConnect.js";

let removeTable = async () => {
	try {
		await sql`DROP TABLE IF EXISTS sessionlist`;
	} catch (error) {
		console.log("Error while trying to remove sessions table");
	}
};

let createTable = async () => {
	try {
		await sql`CREATE TABLE IF NOT EXISTS sessionlist ( 
			id SERIAL PRIMARY KEY,
			token VARCHAR(1000) NOT NULL,
			user_id SERIAL  references users(id) NOT NULL,
			UNIQUE (user_id))`;
	} catch (e) {
		console.log("Error while trying to create sessions table");
		console.log(e);
		return;
	}

	console.log("Sessions table was created...");
};

let add = async (user_id, token) => {
	try {
		await sql`INSERT INTO sessionlist (
			user_id,
			token
			)
		 VALUES (
			${user_id},
			${token}
			) 
		 ON CONFLICT (user_id) DO NOTHING`;
	} catch (e) {
		console.log("Error while adding data to sessions table");
		console.log(e);
	}
};

let remove = async (user_id) => {
	try {
		await sql`DELETE FROM sessionlist WHERE user_id = ${user_id}`;
	} catch (error) {}
};

export default {
	removeTable,
	createTable,
	add,
	remove,
};
