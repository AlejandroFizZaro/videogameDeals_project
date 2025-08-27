import sql from "./dbConnect.js";

let insertToUserDb = async (data) => {
	let { userName, email, hash } = data;
	try {
		let response = await sql`INSERT INTO users 
				(user_name, email, password) 
				VALUES 
				(${userName},${email},${hash}) 
				ON CONFLICT (user_name, email) DO NOTHING 
				RETURNING id`.values();
		return response;
	} catch (e) {
		console.log("Error while inserting data", e);
	}
};

export default insertToUserDb;
