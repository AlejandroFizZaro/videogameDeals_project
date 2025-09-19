import { apiRestUrl, registerUrl, userUrl } from "../apiRestUrl";

type data = {
	email: string | null;
	userName: string | null;
	password: string;
};

export default async function userRegister(data: data): Promise<any> {
	let { email, userName, password } = data;
	try {
		let res = await fetch(`${apiRestUrl}/${userUrl}/${registerUrl}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				userName,
				password,
			}),
		});
		return await res.json();
	} catch (error) {
		console.log("Register error:", error);
		return error;
	}
}
