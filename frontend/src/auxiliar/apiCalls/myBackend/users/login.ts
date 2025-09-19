import { apiRestUrl, userUrl, loginUrl } from "../apiRestUrl";

type data = {
	email: string | null;
	userName: string | null;
	password: string;
	token?: string;
};

type response = {
	email: string | null;
	userName: string | null;
	token?: string;
};

export default async function userLogin(data: data): Promise<any> {
	let { email, userName, password } = data;
	try {
		const res = await fetch(`${apiRestUrl}/${userUrl}/${loginUrl}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: localStorage.getItem("Token"),
				email,
				userName,
				password,
			}),
		});
		const response = await res.json();
		localStorage.setItem("Token", response.token);

		return response;
	} catch (error) {
		console.error("Login error:", error);
		return error;
	}
}
