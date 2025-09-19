import jwt from "jsonwebtoken";

import "dotenv/config";

let createAccountToken = (authenticatedUserData) => {
	let { id } = authenticatedUserData;
	// Setting a secret to code the JWT token.
	let privateKey = process.env.TOKEN_PRIVATE_KEY;

	// Setting time, we need to set an expiration date for generated JWTs
	const secondToMiliseconds = 1000;
	const now = Math.floor(Date.now() / secondToMiliseconds); // jsonwebtoken library manage time as seconds

	return jwt.sign(
		{
			sub: id,
			iss: process.env.JWT_ISS, // TOKEN SUBMIT SITE (i.e. https://examplesite.com)
			iat: now, // TOKEN SUBMIT DATE},
			aud: process.env.JWT_AUD,
		},
		privateKey,
		{ expiresIn: 60 } // 60 seconds
	);
};

export default createAccountToken;
