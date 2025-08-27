import sql from "./dbConnect.js";

let getHashedPasswordfromDb = async (input) => {
	let response = "";
	input.includes("@") // check if input is email. According to that, we will search the user data with userName or email
		? (response = await sql`SELECT * from users where id = ${input}`)
		: (response = await sql`SELECT * from users where email = ${input}`);

	return response;
};

export default getHashedPasswordfromDb;
