import { apiRestUrl, userUrl } from "../apiRestUrl";

type ApiResponse = {
	id: number;
	email: string;
	user_name: string;
};

export async function userGetById(id: number): Promise<ApiResponse> {
	try {
		// TODO: finish setting properly typing and how response and resolve is defined
		const res = await fetch(`${apiRestUrl}/${userUrl}/${id}`);
		const response = await res.json();
		return response;
	} catch (error) {
		console.error(error);
		return { id: 0, email: "", user_name: "" };
	}
}
