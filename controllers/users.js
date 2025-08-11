import sql from "../functions/db/dbConnect.js";
import createAccountToken from "../functions/JWT/createAccountToken.js";

let getAll = async () => {
	console.log("Good, accessed to user endpoint");
	await sql`SELECT * from users`;
};

let getById = async (id) => {
	await sql`SELECT * from users WHERE id = ${id}`;
};

// TODO: Remove before launch
let createUserDb = async () => {
	try {
		console.log("User table creating...");
		await sql`DROP TABLE IF EXISTS favourite,users cascade`;
		console.log("Old tables removed...");
	} catch (err) {
		console.log("Error while removing tables");
		console.log(err);
	}
	await sql`CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY,  user_name VARCHAR(255), email VARCHAR(255), password VARCHAR(300))`;
	await sql`INSERT INTO users ( user_name, email, password )	VALUES ('afiz', 'alejandrofizzaro@gmail.com', 'ThePassword')`;
	await sql`INSERT INTO users ( user_name, email, password ) 	VALUES ('fontaine', 'fontainequezzeronza@gmail.com', 'MyPassword111111uno')`;
	await sql`INSERT INTO users ( user_name, email, password ) 	VALUES ('littleGabe', 'gabeoldwell@gmail.com', 'YouCannotHackMe21434*^Ç')`;
	await sql`INSERT INTO users ( user_name, email, password ) 	VALUES ('magicsword', 'xXXXlittlefluffytailXXXx@gmail.com', 'plsDontHateMe454354$')`;

	console.log("User table created, fool...");
};

let add = async (data) => {
	let { db_name, db_subname, db_email, db_password } = data;
	await sql`INSERT INTO users (user_name, user_subname, email, password) VALUES (${
		(db_name, db_subname, db_email, db_password)
	})`;
};

let login = async (data) => {
	createAccountToken(data);
};

export default {
	getAll,
	getById,
	createUserDb,
	add,
	login,
};
