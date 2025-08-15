import insertToUserDb from "../db/dbUserHashPassword.js";
import getHashedPasswordfromDb from "../db/dbgetHashedPassword.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

// In case the account is registered the first time, the user data + hash is uploaded to the user database.
let hashPasswordAndSendToDb = (data) => {
  let { userName, email, password } = data;
  bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
    newData = {
      userName,
      email,
      hashedPassword,
    };
    insertToUserDb(newData);
  });
};

// Hashed password from user id is extracted and compared with password from POST http call
// If success, access granted and JWT token generated
// JWT token goes to sessions database
// TODO: create sessions database
// TODO: Define the data that will be inside JWT and state JWT creation and refresh
let comparePassword = async (data) => {
  let { email, inputPasswordFromPostCall } = data;
  let hashedPasswordFromDB = getHashedPasswordfromDb(email);
  bcrypt.compare(
    inputPasswordFromPostCall,
    hashedPasswordFromDB,
    (err, result) => {
      result = true
        ? insertToUserDb(data, hashedPasswordFromDB)
        : console.log(err);
    }
  );
};

export default {
  hashPasswordAndSendToDb,
  comparePassword,
};
