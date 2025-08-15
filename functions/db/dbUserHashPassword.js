import sql from "./dbConnect";

let insertToUserDb = async (data, hashPassword) => {
	let { userName, email, hashPassword } = data;
	await sql`INSERT INTO users (user_name, email, password) VALUES (${
		(userName, email, hashPassword)
	})`;
};

export default insertToUserDb;
