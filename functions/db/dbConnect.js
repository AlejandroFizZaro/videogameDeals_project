import postgres from "postgres";

import "dotenv/config";

// Setting up connection settings to the docker postgres container
const sql = postgres({
	host: process.env.DB_HOST, // Postgres ip address[s] or domain name[s]
	port: process.env.DB_PORT, // Postgres server port[s]
	database: process.env.DB_NAME, // Name of database to connect to
	username: process.env.DB_USER, // Username of database user
	password: process.env.DB_PASSWORD, // Password of database user
});

export default sql;
