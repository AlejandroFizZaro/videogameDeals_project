import BiggestDiscounts from "@/app/pages/GameLists/BiggestDiscounts/BiggestDiscounts";
import WatchList from "@/app/pages/GameLists/Watchlist/WatchList";

export default function GameLists() {
	return (
		<div
			title="discountLists"
			className="absolute top-1/2 left-1/2 flex h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2"
		>
			<main className="flex flex-col w-1/2 items-center sm:items-start border-2 border-neutral-500">
				<BiggestDiscounts />
			</main>
			<main className="flex flex-col w-1/2 items-center sm:items-start border-2 border-neutral-500">
				<WatchList />
			</main>
		</div>
	);
}
