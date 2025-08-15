import sql from "./dbConnect";

let getHashedPasswordfromDb = async (id) => {
	let hashPassword = await sql`SELECT password from users where id = ${id}`;
	return hashPassword.password;
};

export default getHashedPasswordfromDb;
