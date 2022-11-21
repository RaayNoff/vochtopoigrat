import axios from "axios";
import { FC, useMemo } from "react";

import Carousel from "../../components/common/Carousel.component";

import ReleaseList from "../../components/common/ReleaseList.component";
import { useActions } from "../../hooks/useActions";

import MainLayout from "../../layouts/MainLayout.component";
import { IGameList, Result } from "../../models/interfaces/IGameList";

interface IHomeProps {
	games: Result[];
}

const Home: FC<IHomeProps> = ({ games }) => {
	const { setGames } = useActions();

	useMemo(() => {
		setGames(games);
	}, [games]);

	return (
		<MainLayout testid="home-page">
			<Carousel />

			<ReleaseList />
		</MainLayout>
	);
};

export default Home;

export const getServerSideProps = async () => {
	let games;

	try {
		const response = await axios.get<IGameList>(
			`${process.env.API_URL}?key=${process.env.API_KEY}`,
		);

		games = response.data.results;
	} catch (error) {
		console.log(error);
	}

	return {
		props: {
			games,
		},
	};
};
