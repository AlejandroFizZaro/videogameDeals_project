import sql from "./dbConnect.js";

let getHashedPasswordfromDb = async (id) => {
	let hashPassword = await sql`SELECT password from users where id = ${id}`;
	return hashPassword.password;
};

export default getHashedPasswordfromDb;
