// http://localhost:3000/users/
import controllerUser from "../controllers/users.js";
import express from "express";
import {
	param,
	body,
	validationResult,
	oneOf,
	cookie,
} from "express-validator";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("User menu");
});

// Developer routes. The ideal way would be to check the user role (i.e. Company admin)
// TODO: When implementing this kind of checks, check the user role

/*
router.get("/all", (req, res) => {
	controllerUser.getAll();
	res.send("All user data obtained");
});

 router.get("/create", (req, res) => {
	controllerUser.createUserDb();
	res.send("Users database created");
});

router.get("/delete", (req, res) => {
	controllerUser.removeTable();
	res.send("User table removed");
});
 */
router.post(
	"/register",
	[
		body("email")
			.notEmpty()
			.withMessage("Email required.")
			.isEmail()
			.normalizeEmail()
			.withMessage("The field must contain an email.")
			.trim()
			.escape(),

		body("userName")
			.notEmpty()
			.withMessage("The userName must not be empty.")
			.trim()
			.escape(),

		body("password")
			.notEmpty()
			.isLength({ min: 7, max: 255 })
			.withMessage("A password must contain between 7 and 255 characters.")
			.trim()
			.escape(),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		let data = req.body;
		let { email, userName, password } = data;
		if (!email || !userName || !password) {
			return res.status(401).json({ error: "Missing credentials" });
		}
		controllerUser.register(data);
		res.status(200).send({
			message: "New user registered. Token will be generated in the login.",
			token: res.token,
			access: res.access,
		});
	}
);

//I have tested with fake data that the token in cookie is well received in this call, but I didn't test with express validator
// TODO: see if its possible to implement express validator properly in this call
/* Background: 
	-	I set the validator with the intention to  validate only the cookie token in case there is no user data	
	-	The validator send all the possible error message when a good http call is sent
	-	"No password", "No email", "No cookie"
	-	Maybe express operator cannot handle properly this specific requirement
 */
router.post(
	"/login",
	[
		oneOf(
			[
				// Option 1: email + password
				[
					body("email")
						.notEmpty()
						.withMessage("Email required.")
						.isEmail()
						.normalizeEmail()
						.withMessage("The field must contain an email."),
					body("password")
						.notEmpty()
						.isLength({ min: 7, max: 255 })
						.withMessage(
							"A password must contain between 7 and 255 characters."
						),
				],
				// Option 2: userName + password
				[
					body("userName")
						.notEmpty()
						.withMessage("The userName must not be empty."),
					body("password")
						.notEmpty()
						.isLength({ min: 7, max: 255 })
						.withMessage(
							"A password must contain between 7 and 255 characters."
						),
				],
				// Option 3: cookie with token
				[
					cookie("token")
						.notEmpty()
						.withMessage("The cookie must not be empty."),
				],
			],
			"You must provide either email+password, userName+password, or a token cookie."
		),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// Token is stored in client side --> cookie
		// TODO: Continue with frontend and go back to cookie in token test
		const cookieToken = req.headers.cookie.split("=")[1];
		if (!cookieToken) {
			const data = req.body;
			const { userName, email, password } = data;
			if (
				(!email && !userName) ||
				(email && !userName) ||
				(!email && userName) ||
				!password
			)
				return res.status(401).json({ error: "Missing credentials" });
			controllerUser.login(cookieToken, data);
		}
		if (cookieToken) {
			// Data is set as null because the login controller handle the data input:
			// If empty, the token is used
			const data = null;
			controllerUser.login(cookieToken, data);
		}
	}
);

router.post(
	"/list/:id/replace",
	[
		param("id").notEmpty().isInt().isUUID(),
		body("email")
			.notEmpty()
			.withMessage("Email required.")
			.isEmail()
			.normalizeEmail()
			.withMessage("The field must contain an email.")
			.trim()
			.escape(),

		body("password")
			.notEmpty()
			.isLength({ min: 7, max: 255 })
			.withMessage("A password must contain between 7 and 255 characters.")
			.trim()
			.escape(),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let id = req.params.id;
		let data = req.body;
		if (!email) {
			return res.status(401).json({ error: "Missing email" });
		}
		controllerUser.replace(data);
	}
);

router.get("/list/:id", (req, res) => {
	const id = req.params.id;
	controllerUser.getById(id);
});

export default router;
