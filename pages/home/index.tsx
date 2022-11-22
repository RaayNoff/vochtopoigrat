import axios from "axios";
import { FC, useEffect } from "react";

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

	useEffect(() => {
		setGames(games);
	}, []);

	return (
		<MainLayout testid="home-page">
			{/* <Carousel sliders={props} /> */}

			<Games />
		</MainLayout>
	);
};

export default Home;

export const getServerSideProps = async () => {
	let games: Game[];
	try {
		const response = await axios.get<ApiGamesTypes>(
			`${process.env.NEXT_PUBLIC_API_URL}?key=${process.env.NEXT_PUBLIC_API_KEY}`,
		);
		games = response.data.results;

		return {
			props: {
				initialGames: games,
			},
		};
	} catch (error) {
		console.log(error);
	}
};
