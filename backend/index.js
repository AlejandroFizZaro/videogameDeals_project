import express from "express";

import routerUsers from "./routes/users.js";
import routerFavourites from "./routes/favourites.js";
import routerSessions from "./routes/sessions.js";

const app = express();
const port = 4000;

app.use(express.json());

app.use("/users", routerUsers);
app.use("/sessions", routerSessions);
app.use("/favourites", routerFavourites);

app.get("/", (req, res) => {
	res.send("You are in the main menu, go to /users or /favourites");
});

app.listen(port, () => {
	console.log(
		`Server init on port ${port}. Access to it through http://localhost:${port}`
	);
});
