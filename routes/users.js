// http://localhost:3000/users/
import controllerUser from "../controllers/users.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User menu");
  controllerUser.getAll();
});

router.get("/init", (req, res) => {
  controllerUser.createFakeDb();
});
router.get("/create", (req, res) => {
  controllerUser.createUserDb();
  res.send(
    "Original users database created, remember that this is just for testing. Your project should have modificable, persistant data"
  );
});

router.post("/new", (req, res) => {
  const data = req.params.data;
  controllerUser.add(data);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  controllerUser.getById(id);
});

router.post("/register", (req, res) => {
  let data = req.body;
  let { email, password } = data;
  if (!email || !password)
    return res.status(401).json({ error: "Missing credentials" });

  controllerUser.register(data);
});

router.post("/login", (req, res) => {
  let data = req.body;
  let { email, password } = data;
  if (!email || !password)
    return res.status(401).json({ error: "Missing credentials" });

  controllerUser.login(data);
});

router.post("/:id/replace", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  if (!email) {
    return res.status(401).json({ error: "Missing email" });
  }
  controllerUser.replace(data);
});

export default router;
