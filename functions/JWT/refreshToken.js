import jwt from "jsonwebtoken";

import "dotenv/config";

let signRefreshToken = (user, refreshId) => {
	return jwt.sign(
		{
			sub: user.id,
			iss: process.env.JWT_ISS, // TOKEN SUBMIT SITE (i.e. https://examplesite.com)
			iat: now, // TOKEN SUBMIT DATE},
			aud: process.env.JWT_AUD,
		},
		REFRESH_SECRET,
		{ algorithm: "HS256", expiresIn: "90 days" }
	);
};

export default signRefreshToken;
