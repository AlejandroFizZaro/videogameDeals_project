"use client";
import listDeals from "@/auxiliar/apiCalls/gameSharkPublicApi/listDeals/listBestDeals";
import LoadingIcon from "@/auxiliar/websiteResources/LoadingIcon";
import { useEffect, useState } from "react";

type MyComponentProps = {
	response?: object;
};

type Deal = {
	internalName: string;
	title: string;
	metacriticLink: string;
	dealID: string;
	storeID: number;
	gameID: number;
	salePrice: number;
	normalPrice: number;
	isOnSale: number;
	savings: number;
	metacriticScore: number;
	steamRatingText: string;
	steamRatingPercent: number;
	steamRatingCount: number;
	steamAppID: number;
	releaseDate: number;
	lastChange: number;
	dealRating: number;
	thumb: string;
};

let styleSeparatePricing: string = "ml-4 mr-4";

const BiggestDiscounts: React.FC<MyComponentProps> = () => {
	const [deals, setDeals] = useState<Deal[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	// ⭐ Save favourites by dealID
	const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

	const toggleFavorite = async (dealID: string) => {
		setFavorites((prev) => ({
			...prev,
			[dealID]: !prev[dealID],
		}));
	};

	useEffect(() => {
		const fetchDeals = async () => {
			try {
				const data = await listDeals();
				setLoading(false);
				setDeals(data);
			} catch (error) {
				console.error("Error fetching deals:", error);
				setDeals([]);
			}
		};
		fetchDeals();
	}, []);

	return (
		<>
			<div className="flex h-15 w-full">
				<div className="w-full text-center bg-green-800 p-4">Best deals</div>
			</div>

			{loading === true ? (
				<LoadingIcon />
			) : (
				<div className="overflow-scroll w-full">
					<ul className="p-3">
						{deals.map((row) => (
							<div key={row.dealID}>
								<div className="table pt-2">
									<li title={row.title}>
										<img src={row.thumb} alt={row.title} width={130} />
									</li>
									<li>{row.title}</li>
								</div>
								<div className="flex right-0 mb-2 w-">
									<li
										title="normalPrice"
										className={`w-1/5 line-through mr-4 p-2`}
									>
										{row.normalPrice}
									</li>
									<li
										title="salePrice"
										className={`${styleSeparatePricing} w-1/5 p-2`}
									>
										{row.salePrice}
									</li>
									<li title="savings" className="bg-green-600 w-1/3 p-2">
										{`${Math.round(row.savings * 100) / 100} %`}
									</li>
									<li title="Favourite" className="w-[50px]">
										<button
											className=" w-full"
											onClick={() => toggleFavorite(row.dealID)}
										>
											{localStorage.getItem("Token") ? (
												<svg
													viewBox="0 0 34 34"
													xmlns="http://www.w3.org/2000/svg"
													fill={favorites[row.dealID] ? "yellow" : "grey"}
												>
													<polygon
														stroke="orange"
														strokeWidth={1}
														points="27.865 31.83 17.615 26.209 7.462 32.009 9.553 20.362 0.99 12.335 12.532 10.758 17.394 0 22.436 10.672 34 12.047 25.574 20.22"
													/>
												</svg>
											) : (
												<></>
											)}
										</button>
									</li>
								</div>
								<li className="border-b-gray-600 border-b-2"></li>
							</div>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

export default BiggestDiscounts;
