// http://localhost:3000/users/
import controllerUser from "../controllers/users.js";
import express from "express";
import { param, body, validationResult, oneOf } from "express-validator";

const router = express.Router();

router.get("/", (req, res, next) => {
	res.send("User menu");
});

// Developer routes. The ideal way would be to check the user role (i.e. Company admin)
// TODO: When implementing this kind of checks, check the user role

router.get("/all", (req, res, next) => {
	controllerUser.getAll();
	res.send("All user data obtained");
});

router.get("/create", (req, res, next) => {
	controllerUser.createUserDb();
	res.send("Users database created");
});

router.get("/delete", (req, res, next) => {
	controllerUser.removeTable();
	res.send("User table removed");
});

router.post(
	"/register",
	[
		body("userName")
			.notEmpty()
			.withMessage("The userName must not be empty.")
			.trim(),

		body("email")
			.notEmpty()
			.withMessage("Email required.")
			.isEmail()
			.withMessage("The field must contain an email.")
			.normalizeEmail(),

		body("password")
			.notEmpty()
			.withMessage("Password required.")
			.isLength({ min: 7, max: 255 })
			.withMessage("A password must contain between 7 and 255 characters.")
			.trim(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, userName, password } = req.body;

		if (!email || !userName || !password) {
			return res.status(401).json({ error: "Missing credentials" });
		}

		let controllerResponse = await controllerUser.register({
			email,
			userName,
			password,
		});
		if (controllerResponse === "userAlreadyInDb") {
			res.status(200).send({
				message: "User already exist",
			});
			return;
		}

		res.status(200).send({
			message: "New user registered. Token will be generated in the login.",
		});
	}
);
/* Background: 
	-	I set the validator with the intention to  validate only the localhost token in case there is no user data	
	-	The validator send all the possible error message when a good http call is sent
	-	"No password", "No email", "No cookie"
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
				[body("token").notEmpty().withMessage("The cookie must not be empty.")],
			],
			"You must provide either email+password, userName+password, or a token cookie."
		),
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// Token is stored in client side --> localhost
		const data = req.body;
		const { userName, email, password, token } = data;
		if (!token) {
			if ((!email || !userName) && !password)
				return res.status(401).json({ error: "Missing credentials" });
		}
		let response = controllerUser.login(data);
		res.status(200).json(await response);
	}
);

router.post(
	"/list/replace/:id",
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
	(req, res, next) => {
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

router.get("/list/:id", (req, res, next) => {
	const id = req.params.id;
	controllerUser.getById(id);
});
router.get("/:id", (req, res, next) => {
	const id = req.params.id;
	controllerUser.getByIdWithoutPassword(id);
	res.send("Be careful");
});

export default router;
