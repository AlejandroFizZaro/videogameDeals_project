import { apiRestUrl, favouritesUrl, listUrl } from "../apiRestUrl";

export default async function getFavouritesByUserByGame(
	userId: number,
	gameId: number
): Promise<boolean> {
	try {
		let res = await fetch(
			`${apiRestUrl}/${favouritesUrl}/${listUrl}/${userId}/${gameId}`
		);
		let response = await res.json();

		return response;
	} catch (error) {
		console.log("Add favourite error:", error);
		return false;
	}
}
