import { addUrl, apiRestUrl, favouritesUrl } from "../apiRestUrl";

export default async function favouriteAdd(
	id: number,
	game: number
): Promise<boolean> {
	try {
		let res = await fetch(
			`${apiRestUrl}/${favouritesUrl}/${id}/${addUrl}/${game}`
		);
		let response = await res.json();

		return response === true; // True: Add favourite complete; False: Add favourite failed
	} catch (error) {
		console.log("Add favourite error:", error);
		return false;
	}
}
