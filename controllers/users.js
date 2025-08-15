import sql from "../functions/db/dbConnect.js";
import createAccountToken from "../functions/JWT/createAccountToken.js";
import comparePassword from "../functions/hash/hashPassword.js";

let getAll = async () => {
  console.log("Good, accessed to user endpoint");
  await sql`SELECT * from users`;
};

let getById = async (id) => {
  await sql`SELECT * from users WHERE id = ${id}`;
};

let getByEmail = async (email) => {
  let response = await sql`SELECT * from users WHERE email = ${email}`;
  console.log(response);
  return response;
};

// TODO: Remove before launch
let createUserDb = async () => {
  try {
    console.log("User table creating...");
    await sql`DROP TABLE IF EXISTS favourite,users cascade`;
    console.log("Old tables removed...");
  } catch (err) {
    console.log(
      "Error while removing tables, maybe it failed because the .env file was not set."
    );
    console.log(err);
  }
  await sql`CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY,  user_name VARCHAR(255), email VARCHAR(255), password VARCHAR(300))`;
  await sql`INSERT INTO users ( user_name, email, password )	VALUES ('afiz', 'alejandrofizzaro@gmail.com', 'ThePassword')`;
  await sql`INSERT INTO users ( user_name, email, password ) 	VALUES ('fontaine', 'fontainequezzeronza@gmail.com', 'MyPassword111111uno')`;
  await sql`INSERT INTO users ( user_name, email, password ) 	VALUES ('littleGabe', 'gabeoldwell@gmail.com', 'YouCannotHackMe21434*^Ç')`;
  await sql`INSERT INTO users ( user_name, email, password ) 	VALUES ('magicsword', 'xXXXlittlefluffytailXXXx@gmail.com', 'plsDontHateMe454354$')`;

  console.log("User table created, fool...");
};

let register = (data) => {
  createAccountToken(data);
};

let login = (data) => {
  if (tokenIsValid) {
    //grant access
  } else {
    data ? comparePassword(data) : console.log("no data");
  }
};

let replace = async (data) => {
  let { email, password } = data;
  let userId = getByEmail(email).id;

  let fieldsToUpdate = {};

  if (email) fieldsToUpdate.email = email;
  if (password) fieldsToUpdate.password = password;

  // if there is no keys in the object, quit the code block
  if (Object.keys(fieldsToUpdate).length === 0) return;

  await sql`UPDATE users SET ${sql(fieldsToUpdate)}
        WHERE id = ${userId}`;
};

export default {
  getAll,
  getById,
  getByEmail,
  createUserDb,
  register,
  login,
  replace,
};
