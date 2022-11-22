import { FC, useEffect, useMemo, useState } from "react";

import Carousel from "../../components/common/Carousel.component";
import Games from "../../components/common/Games.component";

import ReleaseList from "../../components/common/ReleaseList.component";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import MainLayout from "../../layouts/MainLayout.component";

type SliderPropsType = {
	id: number;
	img: string;
	title: string;
};

const Home: FC = () => {
	const { fetchGames } = useActions();
	const { games } = useTypedSelector((state) => state.games);
	const [props, setProps] = useState<SliderPropsType[]>([]);

	useEffect(() => {
		const sliders = games.map((item) => {
			return {
				id: item.id,
				img: item.background_image,
				title: item.name,
			} as SliderPropsType;
		});
		setProps(sliders);
	}, []);

	useEffect(() => {
		fetchGames();
	}, []);

	return (
		<MainLayout testid="home-page">
			{/* <Carousel sliders={props} /> */}

			<Games />
		</MainLayout>
	);
};

export default Home;
