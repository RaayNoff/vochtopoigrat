import axios from "axios";
import { FC, useEffect, useMemo, useState } from "react";

import Carousel from "../../components/common/Carousel.component";

import ReleaseList from "../../components/common/ReleaseList.component";
import { useActions } from "../../hooks/useActions";

import MainLayout from "../../layouts/MainLayout.component";
import { ApiGamesTypes, Game } from "../../types/api";

type HomePropsType = {
	games: Game[];
}

type SliderPropsType = {
	id: number,
	img: string,
	title: string,
}

const Home: FC<HomePropsType> = ({ games }) => {
	const { setGames } = useActions();
	const [ props, setProps ] = useState<SliderPropsType[]>([]);

	useEffect(() => {
		const sliders = games.map(( item => {
			return {
				id: item.id,
				img: item.background_image,
				title: item.name,
			} as SliderPropsType;
		} ));
		setProps(sliders);
	}, [  ]);

	useMemo(() => {
		setGames(games);
	}, [ games ]);

	return (
		<MainLayout testid="home-page">
			<Carousel sliders={props} />

			<ReleaseList />
		</MainLayout>
	);
};

export default Home;

export const getServerSideProps = async () => {
	let games;

	try {
		const response = await axios.get<ApiGamesTypes>(
			`${process.env.NEXT_PUBLIC_API_URL}?key=${process.env.NEXT_PUBLIC_API_KEY}`,
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
