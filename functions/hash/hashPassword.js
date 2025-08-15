import insertToUserDb from "../db/dbUserHashPassword";
import getHashedPasswordfromDb from "../db/dbGetHashedPassword";
import bcrypt from "bcrypt";
const saltRounds = 10;

let hashPasswordAndSendToDb = (data) => {
	let { userName, email, password } = data;
	bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
		newData = {
			userName,
			email,
			hash,
		};
		insertToUserDb(newData, hashedPassword);
	});
};

let comparePassword = async (data) => {
	let { email, inputPasswordInText } = data;
	let hashedPasswordFromDB = getHashedPasswordfromDb(email);
	bcrypt.compare(inputPasswordInText, hashedPasswordFromDB, (err, result) => {
		result = true
			? insertToUserDb(data, hashedPasswordFromDB)
			: console.log(err);
	});
};

export default {
	hashPasswordAndSendToDb,
	comparePassword,
};
