"use client";
import userLogin from "@/auxiliar/apiCalls/myBackend/users/login";
import userRegister from "@/auxiliar/apiCalls/myBackend/users/register";

import { FormEvent, useState } from "react";

type inputData = {
	email: string | null;
	userName: string | null;
	password: string;
	token?: string;
};

type loginResponse = {
	email: string;
	userName: string;
	token?: string;
};

export default function WatchList() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [errorMissingUserName, setErrorMissingUserName] = useState<string>("");
	const [errorMissingEmail, setErrorMissingEmail] = useState<string>("");
	const [errorMissingPassword, setErrorMissingPassword] = useState<string>("");
	const [menuSelected, setMenu] = useState<string>("register");
	const [logged, setLoggedStatus] = useState<boolean>(false);
	const [registered, setRegisteredStatus] = useState<boolean>(false);
	const [userName, setUserName] = useState<string>("");
	const [email, setEmail] = useState<string>("");

	let hideCredentialErrors = () => {
		setErrorMissingUserName("");
		setErrorMissingEmail("");
		setErrorMissingPassword("");
	};

	const setRegisterMenu = () => {
		setMenu("register");
		setRegisteredStatus(false); // Hide text that confirm the user has been registered
		hideCredentialErrors();
	};

	const setLoginMenu = () => {
		setMenu("login");
		hideCredentialErrors();
	};

	const setLogout = () => {
		setLoggedStatus(false);
		localStorage.removeItem("Token");
	};

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			const formData = new FormData(event.currentTarget);

			const userName = formData.get("userName") as string | null;
			const email = formData.get("email") as string | null;
			const password = formData.get("password") as string;
			const token = localStorage.getItem("Token") ?? "";

			const data: inputData = { userName, email, password, token };

			// API calls
			if (menuSelected === "register") {
				if (!userName) {
					setErrorMissingUserName("The user name is missing.");
				}
				if (!email) {
					setErrorMissingEmail("The email is missing.");
				}
				if (!password) {
					setErrorMissingPassword("The password is missing.");
				}
				if (userName && email && password) {
					hideCredentialErrors();
				} else {
					setRegisteredStatus(false);
					return;
				}
				let response = await userRegister(data);
				// Backend check if user is duplicate, it will send a message.
				// In the front end, we need to generate an error and interrupt the register process
				if (response.message === "User already exist") {
					setError(response.message);
					return;
				}
				setError("");
				setRegisteredStatus(true);
			}
			if (menuSelected === "login") {
				if (!userName || !email) {
					!userName &&
						setErrorMissingUserName("The user name or email are missing.");
					!email && setErrorMissingEmail("The user name or email are missing.");
				}
				if (!password) {
					setErrorMissingPassword("The password is missing.");
				}
				if ((userName || email) && password) {
					hideCredentialErrors();
				} else {
					return;
				}
				// TODO: Get data from login (email, username)
				const loginResponse: loginResponse = await userLogin(data);

				let loginSuccess: boolean = loginResponse?.email != null;
				// Check that the login response retrieve data. In case there is data, the login was a success
				setLoggedStatus(loginSuccess);
				setUserName(loginResponse.userName);
				setEmail(loginResponse.email);
			}
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
				console.error(err);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full">
			{logged ? (
				<div>
					<div>
						Logged as {userName} with email {email}
					</div>
					<button onClick={setLogout}>Log out</button>
				</div>
			) : (
				<div id="Not logged">
					<div className="flex h-15">
						<div
							className={` w-1/2 ${
								menuSelected === "register" && "bg-blue-500 "
							} text-center p-4 `}
							onClick={setRegisterMenu}
						>
							Register
						</div>
						<div
							className={`w-1/2 ${
								menuSelected === "login" && "bg-blue-500 "
							} text-center p-4`}
							onClick={setLoginMenu}
						>
							Login
						</div>
					</div>
					<div className="overflow-scroll w-full">
						<div className="pt-10 pl-16 pr-16 pb-10 text-center">
							You need to login or create an account to access the favourites
							menu.
							<div>
								{menuSelected === "register"
									? "Create an account"
									: "Login with the user name or email"}
							</div>
						</div>
						<form className="pl-2 pr-2 grid" onSubmit={onSubmit}>
							<div className="grid">
								username
								<div className="text-red-600">{errorMissingUserName}</div>
								<input
									type="text"
									name="userName"
									placeholder="myUserNameExample"
									className="m-2 border-4 border-amber-50 rounded-2xl p-2"
								/>
							</div>
							<div className="grid">
								email
								<div className="text-red-600">{errorMissingEmail}</div>
								<input
									type="text"
									name="email"
									placeholder="myemail@example.com"
									className="m-2 border-4 border-amber-50 rounded-2xl p-2"
								/>
							</div>
							<div className="grid">
								password
								<div className="text-red-600">{errorMissingPassword}</div>
								<input
									type="password"
									name="password"
									placeholder="password"
									className="m-2 border-4 border-amber-50 rounded-2xl p-2"
								/>
							</div>

							<button
								type="submit"
								className=" p-2 bg-blue-500 border-2 border-blue-200 rounded-2xl"
							>
								Submit
							</button>
							<div className="text-green-600">
								{menuSelected === "register" &&
									registered === true &&
									"The user has been registered"}
							</div>
							{isLoading && <p>Cargando...</p>}
							{error && <p style={{ color: "red" }}>{error}</p>}
							{logged && <p>Bienvenido!</p>}
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
