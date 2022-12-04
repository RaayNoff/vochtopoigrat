import { GetServerSideProps, NextPage } from "next";

import { useEffect } from "react";

import Carousel from "../../components/common/Carousel.component";
import Games from "../../components/common/Games.component";
import { useActions } from "../../hooks/useActions";

import MainLayout from "../../layouts/MainLayout.component";
import { ApiGamesTypes, Game } from "../../types/api";

import s from "../../styles/pages/Home.module.scss";
import { ISlider } from "../../models/interfaces/ISlidersState";

interface IHomeProps {
	initialGames: Game[];
	initialSliders: ISlider[];
}

const Home: NextPage<IHomeProps> = ({
	initialGames: games,
	initialSliders: sliders,
}) => {
	const { setGames, setSliders } = useActions();

	useEffect(() => {
		setGames(games);
		setSliders(sliders);
	}, []);

	return (
		<MainLayout testid="home-page" selfClassName={s.home}>
			<Carousel className={s.home__carousel} />

			<Games className={s.home__games} />
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	let initialGames: Game[];
	let initialSliders: ISlider[];

	try {
		const options = { method: "GET" };
		const initialGamesResponse = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}?key=${process.env.NEXT_PUBLIC_API_KEY}&page_size=5`,
			options,
		);
		const initialGamesData: ApiGamesTypes = await initialGamesResponse.json();
		initialGames = initialGamesData.results;

		const initialCarouselResponse = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}?key=${process.env.NEXT_PUBLIC_API_KEY}&page_size=6`,
			options,
		);

		const initialSlidersData: ApiGamesTypes =
			await initialCarouselResponse.json();

		initialSliders = initialSlidersData.results.map((item) => {
			return {
				id: item.id,
				img: item.background_image,
				title: item.name,
			};
		});

		return {
			props: {
				initialGames,
				initialSliders,
			},
		};
	} catch (error) {
		console.log(error);

		return {
			props: {
				initialGames: [] as Game[],
				initialSliders: [] as ISlider[],
			},
		};
	}
};

export default Home;
