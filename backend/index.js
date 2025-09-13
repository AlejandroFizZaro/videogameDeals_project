import express from "express";
import cors from "cors";

import routerUsers from "./routes/users.js";
import routerFavourites from "./routes/favourites.js";
import routerSessions from "./routes/sessions.js";

const app = express();
const port = 4000;

app.use(express.json());

// Habilitar CORS para el frontend de Next.js
app.use(
	cors({
		origin: "http://localhost:3000", // origen de tu frontend
		credentials: true, // si usas cookies/autenticación
	})
);

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
