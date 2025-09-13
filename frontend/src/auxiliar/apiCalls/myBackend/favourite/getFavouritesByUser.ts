import { apiRestUrl, favouritesUrl, listUrl } from "../apiRestUrl";

export default async function getFavouritesByUser(
	userId: number
): Promise<boolean> {
	try {
		let res = await fetch(
			`${apiRestUrl}/${favouritesUrl}/${listUrl}/${userId}`
		);
		let response = await res.json();

		return response;
	} catch (error) {
		console.log("Add favourite error:", error);
		return false;
	}
}
