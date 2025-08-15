import sql from "./dbConnect.js";

let insertToUserDb = async (data, hashPassword) => {
	let { userName, email } = data;
	await sql`INSERT INTO users (user_name, email, password) VALUES (${
		(userName, email, hashPassword)
	})`;
};

export default insertToUserDb;
