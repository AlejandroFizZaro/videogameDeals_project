import jwt from "jsonwebtoken";

import "dotenv/config";

let signRefreshToken = (userId) => {
	return jwt.sign(
		{
			sub: userId,
			iss: process.env.JWT_ISS, // TOKEN SUBMIT SITE (i.e. https://examplesite.com)
			iat: now, // TOKEN SUBMIT DATE},
			aud: process.env.JWT_AUD,
		},
		REFRESH_SECRET,
		{
			algorithm: "HS256",
			expiresIn: 60, // 60 seconds
		}
	);
};

export default signRefreshToken;
