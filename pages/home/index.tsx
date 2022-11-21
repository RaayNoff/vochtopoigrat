import { FC, useEffect } from "react";

import Carousel from "../../components/common/Carousel.component";

import ReleaseList from "../../components/common/ReleaseList.component";
import { useActions } from "../../hooks/useActions";

import MainLayout from "../../layouts/MainLayout.component";

const Home: FC = () => {
	const { fetchGames } = useActions();

	useEffect(() => {
		fetchGames();
	}, []);

	return (
		<MainLayout testid="home-page">
			<Carousel></Carousel>

			<ReleaseList />
		</MainLayout>
	);
};

export default Home;
