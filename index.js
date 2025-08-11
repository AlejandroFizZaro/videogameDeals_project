import express from "express";

import routerUsers from "./routes/users.js";
import routerMovies from "./routes/favourites.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/favourites", routerMovies);
app.use("/users", routerUsers);

app.get("/", (req, res) => {
	res.send("You are in the main menu, go to /users or /favourites");
});

app.listen(port, () => {
	console.log(
		`Server init on port ${port}. Access to it through http://localhost:${port}`
	);
});
