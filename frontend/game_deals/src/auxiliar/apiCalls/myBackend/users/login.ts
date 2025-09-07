import { tokenFromLocalStorage } from "../../../weBrowserResources/websiteResources";
import { apiRestUrl, userUrl, loginUrl } from "../apiRestUrl";

type data = {
	email: string;
	userName: string;
	password: string;
	token: string;
};

export default async function userLogin(data: data): Promise<boolean> {
	let { email, userName, password } = data;

	try {
		const res = await fetch(`${apiRestUrl}/${userUrl}/${loginUrl}`, {
			method: "POST",
			body: JSON.stringify({
				token: tokenFromLocalStorage,
				email,
				userName,
				password,
			}),
		});
		const response = await res.json();

		return response.success === true; //True: Acces grant; False: Access denied
	} catch (error) {
		console.error("Login error:", error);
		return false;
	}
}
