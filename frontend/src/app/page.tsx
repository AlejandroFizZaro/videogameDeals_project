import Image from "next/image";

import MenuScreen from "@/app/pages/menuScreen/menuScreen";
import Header from "@/app/pages/Header/Header";
import GameLists from "@/app/pages/GameLists/GameLists";

export default function Home() {
	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] w-screen items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<section>
				<MenuScreen />
			</section>
			<header className="absolute grid grid-rows-[20px_1fr_20px] w-screen h-20 top-0 border-l-red border-black  border-b-neutral-500 border-2">
				<Header />
			</header>
			<section>
				<GameLists />
			</section>
		</div>
	);
}
