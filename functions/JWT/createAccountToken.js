import jwt from "jsonwebtoken";

import "dotenv/config";

let createAccountToken = (data) => {
	let privateKey = process.env.TOKEN_PRIVATE_KEY; // The password stored in server. Without it,
	let { user, password } = data;
	let token = jwt.sign(
		/* { user: "afizaro", password: "ThePassword" } ,*/ //Hash + salt the password
		{ user, password },
		privateKey,

		//Options
		{
			expiresIn: 60, //seconds
		}
	);
	console.log(token);
};

export default createAccountToken;
