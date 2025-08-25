import sql from "../functions/db/dbConnect.js";
import createNewToken from "../functions/JWT/createNewToken.js";
import hashPassword from "../functions/hash/hashPassword.js";
import controllerSessions from "./sessions.js";
import validateToken from "../functions/JWT/validator.js";

let getAll = async () => {
	console.log("Good, accessed to user endpoint");
	await sql`SELECT * from users`;
};

let getById = async (id) => {
	await sql`SELECT * from users WHERE id = ${id}`;
};

let getByEmail = async (email) => {
	let response = await sql`SELECT * from users WHERE email = ${email ?? null}`;
	return response;
};

let getByUsername = async (userName) => {
	let response = await sql`SELECT * from users WHERE user_name = ${
		userName ?? null
	}`;
	return response;
};

let createUserDb = async () => {
	await sql`CREATE TABLE IF NOT EXISTS users 
	( id SERIAL PRIMARY KEY,
		user_name VARCHAR(255),
		email VARCHAR(255),
		password VARCHAR(300),
		UNIQUE (user_name, email)
	)`;
};

let register = async (data) => {
	let { userName, email, password } = data;

	let userId = await getUserId(email, userName);
	if (userId) {
		console.log("User exist already");
		return;
	}

	if (password) {
		await hashPassword.hashPasswordAndSendToDb(data);
	} else {
		console.log("Missing password");
		return;
	}
};

// TODO: Check  how backend accept token from frontend (to do once start workin in frontend)
let login = async (cookieToken, data) => {
	let access = false;
	let tokenValidationStatus = validateToken(cookieToken);
	let tokenIsCorrect = (await tokenValidationStatus)?.correct;
	let tokenIsExpired = (await tokenValidationStatus)?.expired;

	let tokenIsValid = cookieToken && tokenIsCorrect && !tokenIsExpired;

	if (tokenIsValid) {
		console.log("Access granted");
		access = true;
		return access;
	} else {
		if (data) {
			// Compare the hash password with the input password.
			// If the password is ok, the function will return the user data in an object
			// In case it not ok, it will send a "false" value
			let authenticatedUserData = await hashPassword.comparePasswordWithHash(
				data
			);
			if (authenticatedUserData === false) {
				console.log("The credentials are not correct. Please repeat again");
				return;
			}
			// User data is sent from the authenticator as an object
			if (typeof authenticatedUserData === "object") {
				console.log("Credentials are correct");
				let userId = authenticatedUserData[0]?.id;

				if (cookieToken && tokenIsExpired) {
					let refreshToken = refreshToken(userId);
					// TODO: Set function for token refresh replace
					await controllerSessions.replace(userId, refreshToken);
				}
				if (!cookieToken) {
					let newToken = createNewToken(authenticatedUserData);
					await controllerSessions.add(userId, newToken);
				}
				access = true;
				return { access };
			} else {
				console.log(
					"An error occurred while validating the credentials. Please try again"
				);
				return;
			}
		} else {
			console.log("No data for logging in");
		}
	}
};

let replace = async (data) => {
	let { email, password } = data;
	let userId = await getByEmail(email).id;

	let fieldsToUpdate = {};

	if (email) fieldsToUpdate.email = email;
	if (password) fieldsToUpdate.password = password;

	// if there is data to update, quit the code block
	if (Object.keys(fieldsToUpdate).length === 0) return;

	await sql`UPDATE users SET ${sql(fieldsToUpdate)}
        WHERE id = ${userId}`;
};

let getUserId = async (email, userName) => {
	if (email || (email && userName) || (email && !userName)) {
		return (await getByEmail(email))[0]?.id;
	} else if (userName) {
		return (await getByUsername(userName))[0]?.id;
	}
};

let removeTable = async () => {
	await sql`DROP TABLE IF EXISTS sessionList, favourite, users cascade`;
};

export default {
	getAll,
	getById,
	getByEmail,
	getByUsername,
	createUserDb,
	register,
	login,
	replace,
	getUserId,
	removeTable,
};
