import insertToUserDb from "../db/dbUserHashPassword.js";
import controllerUser from "../../controllers/users.js";
import bcrypt from "bcryptjs";

let hashPasswordAndSendToDb = async (data) => {
	let { userName, email, password } = data;
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	let newUserData = {
		userName,
		email,
		hash,
	};
	let response = await insertToUserDb(newUserData);
	return response;
};

let comparePasswordWithHash = async (data) => {
	let { userName, email, password } = data;
	let userData = {};
	let hashedPasswordFromDB = "";
	email
		? (userData = await controllerUser.getByEmail(email))
		: (userData = await controllerUser.getUserName(userName));

	hashedPasswordFromDB = userData[0].password;
	const result = await new Promise((resolve, reject) => {
		bcrypt.compare(password, hashedPasswordFromDB, (err, res) => {
			if (err) reject(err);
			res === true ? resolve(userData) : resolve(res);
		});
	});
	console.log("Out of compare", result);
	return result;
};

export default {
	hashPasswordAndSendToDb,
	comparePasswordWithHash,
};
