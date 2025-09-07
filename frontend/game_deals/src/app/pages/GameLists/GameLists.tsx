import FeaturedGames from "@/app/pages/GameLists/FeaturedGames/FeaturedGames";
import BiggestDiscounts from "@/app/pages/GameLists/BiggestDiscounts/BiggestDiscounts";
import WatchList from "@/app/pages/GameLists/Watchlist/WatchList";

export default function GameLists() {
	return (
		<div
			title="discountLists"
			className="absolute flex h-170 w-2/3 top-40 left-1/9"
		>
			<main className="flex flex-col gap-[32px] row-start-2 w-1/3 items-center sm:items-start border-2 border-neutral-500">
				<FeaturedGames />
			</main>
			<main className="flex flex-col gap-[32px] row-start-2 w-1/3 items-center sm:items-start border-2 border-neutral-500">
				<BiggestDiscounts />
			</main>
			<main className="flex flex-col gap-[32px] row-start-2 w-1/3 items-center sm:items-start border-2 border-neutral-500">
				<WatchList />
			</main>
		</div>
	);
}
