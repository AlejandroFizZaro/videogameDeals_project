import sql from "../functions/db/dbConnect.js";
import createNewToken from "../functions/JWT/createNewToken.js";
import hashPassword from "../functions/hash/hashPassword.js";
import controllerSessions from "./sessions.js";
import validateToken from "../functions/JWT/validator.js";
import signRefreshToken from "../functions/JWT/refreshToken.js";

// Get all data
let getAll = async () => {
	let response = await sql`SELECT * from users`[0];
	return response;
};

let getById = async (id) => {
	let response =
		await sql`SELECT id, user_name, email from users WHERE id = ${id}`;
	return response[0];
};

let getByEmail = async (email) => {
	let emailData = email ?? null;
	let response = await sql`SELECT * from users WHERE email = ${emailData}`;
	return response[0];
};

let getByUsername = async (userName) => {
	let userNameData = userName ?? null;
	let response =
		await sql`SELECT * from users WHERE user_name = ${userNameData}`;
	return response[0];
};

//

// Get all data without passwords
let getByIdWithoutPassword = async (id) => {
	let response = await sql`SELECT user_name, email from users WHERE id = ${id}`;
	return response[0];
};

//

let createUserDb = async () => {
	try {
		await sql`CREATE TABLE IF NOT EXISTS users 
			( id SERIAL PRIMARY KEY,
			user_name VARCHAR(255),
			email VARCHAR(255),
			password VARCHAR(300),
			UNIQUE (user_name, email)
		)`;
		return true;
	} catch (error) {
		return false;
	}
};

const register = async ({ userName, email, password }) => {
	const userId =
		(await getByUsername(userName))?.id || (await getByEmail(email))?.id;

	if (await userId) {
		return "userAlreadyInDb";
	}

	if (!password) {
		return;
	}

	return hashPassword.hashPasswordAndSendToDb({ userName, email, password });
};

// TODO: Check  how backend accept token from frontend (to do once start workin in frontend)
let login = async (data) => {
	let { token, email, userName, password } = data;
	let tokenValidationStatus = validateToken(token);
	let tokenIsCorrect = (await tokenValidationStatus)?.correct;
	let tokenIsExpired = (await tokenValidationStatus)?.expired;

	let tokenIsValid = token && tokenIsCorrect && !tokenIsExpired;

	if (tokenIsValid) {
		return token;
	} else {
		// If there is an existant token in local storage and is not correct, we remove it from the variable in order to
		token = null;
		if ((email != "" || userName != "") && password) {
			// Compare the hash password with the input password.
			// If the password is ok, the function will return the user data in an object
			// In case it not ok, it will send a "false" value
			let credentials = { email, userName, password };
			let authenticatedUserData = await hashPassword.comparePasswordWithHash(
				credentials
			);
			if (authenticatedUserData === false) {
				return;
			}
			// User data is sent from the authenticator as an object
			if (typeof authenticatedUserData === "object") {
				// In the front end it was enabled the option to log with the user name or the email,
				// In case user name or email is empty, it is necessary to fill the missing data
				let userId = authenticatedUserData?.id;
				let email = authenticatedUserData?.email;
				let userName = authenticatedUserData?.user_name;
				if (token && tokenIsExpired) {
					let refreshToken = signRefreshToken(userId);
					// TODO: Set function for token refresh replace
					await controllerSessions.replace(userId, refreshToken);
					return { email, userName, token: refreshToken };
				}
				if (!token) {
					let newToken = createNewToken(authenticatedUserData);
					await controllerSessions.add(userId, newToken);
					return { email, userName, token: newToken };
				}
			} else {
				return;
			}
		} else {
			return;
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
		return (await getByEmail(email))?.id;
	} else if (userName) {
		return (await getByUsername(userName))?.id;
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
	getByIdWithoutPassword,
	createUserDb,
	register,
	login,
	replace,
	getUserId,
	removeTable,
};
