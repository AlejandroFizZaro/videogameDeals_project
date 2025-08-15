import jwt from "jsonwebtoken";

import "dotenv/config";

let createAccountToken = () => {
	let privateKey = process.env.TOKEN_PRIVATE_KEY;
	let token = jwt.sign(
		{
			data: "foobar",
		},
		privateKey,
		{ expiresIn: "1h" }
	);
	console.log(token);
};

export default createAccountToken;
