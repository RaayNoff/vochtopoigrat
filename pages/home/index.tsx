import axios from "axios";
import { FC, useEffect, useState } from "react";

import Carousel from "../../components/common/Carousel.component";
import Games from "../../components/common/Games.component";
import { useActions } from "../../hooks/useActions";

import MainLayout from "../../layouts/MainLayout.component";
import { ApiGamesTypes, Game } from "../../types/api";

type SliderPropsType = {
	id: number;
	img: string;
	title: string;
};

interface IHomeProps {
	initialGames: Game[];
}

const Home: FC<IHomeProps> = ({ initialGames: games }) => {
	const { setGames } = useActions();
	const [props, setProps] = useState<SliderPropsType[]>([]);

	useEffect(() => {
		const sliders = games?.map((item) => {
			return {
				id: item.id,
				img: item.background_image,
				title: item.name,
			} as SliderPropsType;
		});
		setProps(sliders);
	}, []);

	useEffect(() => {
		setGames(games);
	}, []);

	return (
		<MainLayout testid="home-page">
			<Carousel sliders={props} />

			<Games />
		</MainLayout>
	);
};

export default Home;

export const getServerSideProps = async () => {
	let games: Game[];
	try {
		const options = { method: "GET" };
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}?key=${process.env.NEXT_PUBLIC_API_KEY}&page_size=5`,
			options,
		);
		// console.log(await res.json());
		const data: ApiGamesTypes = await res.json();
		games = data.results;

		return {
			props: {
				initialGames: games,
			},
		};
	} catch (error) {
		console.log(error);
	}
};
