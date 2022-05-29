import React from "react";

interface Props {
	price: number;
	image: string;
	onClick: () => void;
}

const PowerUp: React.FC<Props> = ({ price, image, onClick }) => {
	return (
		<div className="flex flex-col justify-center items-center h-12">
			<button
				onClick={onClick}
				className="flex justify-center items-center rounded-full bg-gray-100 shadow-sm w-8 h-8"
			>
				<img className="w-6 h-6" src={image} />
			</button>
			<p className="text-sm font-thin">
				Cost: <span className="font-semibold">{price}</span>
			</p>
		</div>
	);
};

export default PowerUp;
