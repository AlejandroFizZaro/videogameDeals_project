import jwt from "jsonwebtoken";
import "dotenv/config";

let validateToken = async (cookieToken) => {
	let tokenResults = {
		expired: false,
		correct: true,
	};

	let result = await new Promise((resolve, reject) => {
		jwt.verify(cookieToken, process.env.TOKEN_PRIVATE_KEY, (err, decoded) => {
			if (err) {
				if (err.expiredAt) {
					tokenResults.expired = true;
				} else {
					tokenResults.correct = false;
				}

				resolve(tokenResults);
			} else {
				resolve(tokenResults);
			}
		});
	});
	return result;
};

export default validateToken;
