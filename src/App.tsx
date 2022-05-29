import React, { useEffect, useState } from "react";
import CookieImage from "./cookie.jpg";
import HeartImage from "./heart.png";
import CherryTreeIamge from "./cherry_tree.png";
import SnailImage from "./snail.png";
import PowerUp from "./components/PowerUp";

function App() {
	const [cookies, setCookies] = useState<number>(0);
	const [cookiesPerSec, setCookiesPerSec] = useState<number>(0);

	const [firstPowerUpPrice, setFirstPowerUpPrice] = useState<number>(1);
	const [secondPowerUpPrice, setSecondPowerUpPrice] = useState<number>(10);
	const [thirdPowerUpPrice, setThirdPowerUpPrice] = useState<number>(100);

	const priceMultiplier = 1.5;

	useEffect(() => {
		const timer = setTimeout(() => {
			setCookies((prev) => prev + cookiesPerSec);
		}, 1e3);
		return () => clearTimeout(timer);
	});

	const canBuy = (price: number): boolean => {
		const delta = cookies - price;
		return delta >= 0;
	};

	const buy = (
		setter: (val: React.SetStateAction<number>) => void,
		price: number,
		cookiesToAdd: number
	) => {
		setCookies((prev) => Number((prev - price).toFixed(2)));
		setter((prev) => Number((prev * priceMultiplier).toFixed(2)));
		setCookiesPerSec((prev) => prev + cookiesToAdd);
	};

	return (
		<div className="bg-gray-200 flex flex-col items-center min-h-screen select-none">
			<p className="text-4xl font-semibold">Score: {cookies}</p>
			<p>Cookies per second: {cookiesPerSec}</p>
			<span className="flex-1" />
			<div
				onClick={() => {
					setCookies((prev) => prev + 1);
				}}
				className="animate-spin"
			>
				<img
					className="rounded-full w-64 h-64 shadow-md"
					src={CookieImage}
				/>
			</div>
			<div className="mt-4 p-2 flex w-full justify-evenly h-16 gap-2 bg-gray-300">
				<PowerUp
					image={SnailImage}
					price={firstPowerUpPrice}
					onClick={() => {
						if (canBuy(firstPowerUpPrice))
							buy(setFirstPowerUpPrice, firstPowerUpPrice, 1);
					}}
				/>
				<PowerUp
					image={CherryTreeIamge}
					price={secondPowerUpPrice}
					onClick={() => {
						if (canBuy(secondPowerUpPrice))
							buy(setSecondPowerUpPrice, secondPowerUpPrice, 5);
					}}
				/>
				<PowerUp
					image={HeartImage}
					price={thirdPowerUpPrice}
					onClick={() => {
						if (canBuy(thirdPowerUpPrice))
							buy(setThirdPowerUpPrice, thirdPowerUpPrice, 50);
					}}
				/>
			</div>
			<span className="flex-1" />
		</div>
	);
}

export default App;
