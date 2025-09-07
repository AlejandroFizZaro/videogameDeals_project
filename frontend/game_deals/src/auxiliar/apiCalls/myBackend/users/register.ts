import { apiRestUrl, registerUrl, userUrl } from "../apiRestUrl";

type data = {
	email: string;
	userName: string;
	password: string;
};

export default async function userRegister(data: data): Promise<boolean> {
	let { email, userName, password } = data;
	try {
		let res = await fetch(`${apiRestUrl}/${userUrl}/${registerUrl}`, {
			method: "POST",
			body: JSON.stringify({
				email,
				userName,
				password,
			}),
		});
		let response = await res.json();

		return response === true; //True: Register complete; False: Register failed
	} catch (error) {
		console.log("Register error:", error);
		return false;
	}
}
