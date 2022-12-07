import { GetServerSideProps, NextPage } from "next";
import moment from "moment";

import { useEffect } from "react";

import Carousel from "../../components/common/Carousel.component";
import Games from "../../components/common/Games.component";
import { useActions } from "../../hooks/useActions";

import MainLayout from "../../layouts/MainLayout.component";
import { ApiGamesTypes, Game, SlidersResponse } from "../../types/api";

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
	}, [games, sliders]);

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
		const urls = {
			games: `${process.env.NEXT_PUBLIC_API_URL}?key=${process.env.NEXT_PUBLIC_API_KEY}&page_size=5`,
			sliders: `${process.env.NEXT_PUBLIC_API_URL}?key=${process.env.NEXT_PUBLIC_API_KEY}&page_size=8&ordering=released,-metacritic,rating&exclude_stores=1,4,6&metacritic=82,100`,
		};

		const initialGamesResponse: ApiGamesTypes = await fetch(
			urls.games,
			options,
		).then((data) => data.json());

		initialGames = initialGamesResponse.results;

		const getDateRange = () => {
			const nowDate = new Date();

			const nowDateTimestamp = Math.ceil(nowDate.getTime() / 1000);

			const yearAgoTimestamp = nowDateTimestamp - 63072000;

			const yearAgoDate = new Date(yearAgoTimestamp * 1000);

			const formated = {
				yearAgo: moment(yearAgoDate).format("YYYY-MM-DD"),
				current: moment(nowDate).format("YYYY-MM-DD"),
			};

			return `${formated.yearAgo},${formated.current}`;
		};

		const optionsSlider = { method: "GET" };
		const initialSlidersResponse: SlidersResponse = await fetch(
			urls.sliders + `&dates=${getDateRange()}`,
			optionsSlider,
		).then((data) => data.json());

		initialSliders = initialSlidersResponse.results.map((item) => {
			return {
				id: item.id,
				title: item.name,
				img: item.background_image,
			} as ISlider;
		});

		return {
			props: {
				initialGames,
				initialSliders,
			},
		};
	} catch (error) {
		return {
			props: {
				initialGames: [] as Game[],
				initialSliders: [] as ISlider[],
			},
		};
	}
};

export default Home;
