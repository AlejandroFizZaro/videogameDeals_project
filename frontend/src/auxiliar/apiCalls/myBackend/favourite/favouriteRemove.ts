import { apiRestUrl, favouritesUrl, removeUrl } from "../apiRestUrl";

export default async function favouriteRemove(
	id: number,
	game: number
): Promise<boolean> {
	try {
		let res = await fetch(
			`${apiRestUrl}/${favouritesUrl}/${id}/${removeUrl}/${game}`
		);
		let response = await res.json();

		return response === true; // True: Remove favourite complete; False: Remove favourite failed
	} catch (error) {
		console.log("Add favourite error:", error);
		return false;
	}
}
