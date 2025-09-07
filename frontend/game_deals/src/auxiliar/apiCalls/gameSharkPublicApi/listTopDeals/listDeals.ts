import urls from "../../apiResources/urls";

//"https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"
export default async function listDeals(): Promise<[]> {
	const { gameDealUrl, deals, storeID, upperPrice, and, equal } = urls;
	let res = await fetch(
		`${gameDealUrl}${deals}${storeID}${equal}1${and}${upperPrice}${equal}15`
	);
	let response = await res.json();
	return await response;
}
