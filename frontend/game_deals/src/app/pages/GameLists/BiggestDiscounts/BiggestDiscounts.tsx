"use client";
import listDeals from "@/auxiliar/apiCalls/gameSharkPublicApi/listTopDeals/listDeals";
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

	useEffect(() => {
		const fetchDeals = async () => {
			try {
				const data = await listDeals();
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
			<div className="h-fit w-full text-center bg-green-800 ">Best deals</div>
			<div className="overflow-scroll">
				<ul className="">
					{deals.map((row) => (
						<>
							<div className="flex pt-2">
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
							</div>

							<li className="border-b-gray-600 border-b-2"></li>
						</>
					))}
				</ul>
			</div>
		</>
	);
};

export default BiggestDiscounts;
