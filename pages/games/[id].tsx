import React, { useState } from "react";
import clsx from "clsx";
import { GetServerSideProps, NextPage } from "next";

import Swiper from "swiper";
import dynamic from "next/dynamic";

import { getPlaiceholder } from "plaiceholder";

import GameData from "../../components/ui/GameData.component";

import MainLayout from "../../layouts/MainLayout.component";
import s from "../../styles/pages/Game.module.scss";

import { Genre, ParentPlatforms } from "../../types/api";

import {
	Developer,
	Game,
	Publisher,
	Screenshoot as ScreenshootType,
	ScreenshotsResponse,
	Store,
	StoreDetailed,
	StoreResponse,
} from "../../types/game";
import PersonalImageGame from "../../components/ui/PersonalImageGame.componen";
import Metascore from "../../components/ui/Metascore.component";
import Screenshoot from "../../components/ui/Screenshoot.component";
import { useBodyLock } from "../../hooks/useBodyLock";

const ScreenshootsSwiper = dynamic(
	() => import("../../components/ui/ScreenshootsSwiper.component"),
	{
		ssr: false,
	},
);

interface IGamePageProps {
	released: string;
	metacritic: number;
	description: string;
	name: string;
	genres: Genre[];
	developers: Developer[];
	parent_platforms: ParentPlatforms[];
	publishers: Publisher[];
	stores: Store[];
	storesUrls: StoreDetailed[];
	background_image: string;
	gameImgBase64: string;
	sshoots: ScreenshootType[];
}

const GamePage: NextPage<IGamePageProps> = ({
	background_image,
	gameImgBase64,
	description,
	developers,
	genres,
	metacritic,
	name,
	parent_platforms,
	publishers,
	released,
	stores,
	sshoots,
	storesUrls,
}) => {
	const [swiperActive, setSwiperActive] = useState(false);
	const [swiper, setSwiper] = useState<Swiper>();
	const { toggleBodyLock } = useBodyLock();

	const swiperHandler = () => {
		toggleBodyLock();

		setSwiperActive((prev) => !prev);
	};

	const imageClickHandler = (e: React.MouseEvent) => {
		const target = e.target as HTMLImageElement;

		if (target.dataset.index) {
			swiper?.slideTo(Number(target.dataset.index));
			swiperHandler();
		}
	};

	return (
		<MainLayout title={`WTP | ${name}`} selfClassName={clsx(s.game)}>
			<div className="container">
				<div className={s.game__container}>
					<article className={s.game__info}>
						<PersonalImageGame
							src={background_image || ""}
							alt={name}
							className={s.game__image}
							width={720}
							height={405}
							blurData={gameImgBase64}
						/>

						<GameData
							className={s.game__data}
							description={description}
							developers={developers}
							genres={genres}
							name={name}
							platfroms={parent_platforms}
							publishers={publishers}
							released={released}
							stores={stores}
							storesUrls={storesUrls}
						/>

						<Metascore score={metacritic} />
					</article>

					<section
						className={clsx(s.game__screenshoots, s.screenshoots)}
						onClick={(e) => imageClickHandler(e)}
					>
						<div className={s.screenshoots__container}>
							{sshoots?.map((sshoot, i) => (
								<Screenshoot
									key={sshoot.id}
									alt={name}
									height={1080}
									width={1920}
									src={sshoot.image}
									className={s.screenshoots__item}
									dataIndex={i}
								/>
							))}
						</div>
					</section>
				</div>
			</div>

			<ScreenshootsSwiper
				activeState={swiperActive}
				gameName={name}
				screenshoots={sshoots}
				setSwiper={setSwiper}
				swiperHandler={swiperHandler}
			/>
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	try {
		const querys = new URLSearchParams({
			key: `${process.env.NEXT_PUBLIC_API_KEY}`,
		});

		const urls = {
			screenshots:
				`${process.env.NEXT_PUBLIC_API_URL}/${params?.id}/screenshots?` + querys,
			gameDetails: `${process.env.NEXT_PUBLIC_API_URL}/${params?.id}?` + querys,
			stores: `${process.env.NEXT_PUBLIC_API_URL}/${params?.id}/stores?` + querys,
		};

		const {
			released,
			metacritic,
			name,
			genres,
			developers,
			parent_platforms,
			publishers,
			background_image,
			stores,
			description,
		}: Game = await fetch(urls.gameDetails).then((data) => data.json());

		const { results: sshoots }: ScreenshotsResponse = await fetch(
			urls.screenshots,
		).then((data) => data.json());

		const { results: storesUrls }: StoreResponse = await fetch(urls.stores).then(
			(data) => data.json(),
		);

		const { base64: gameImgBase64 } = await getPlaiceholder(background_image);

		return {
			props: {
				released,
				metacritic,
				description,
				name,
				genres,
				developers,
				parent_platforms,
				publishers,
				background_image,
				gameImgBase64,
				stores,
				storesUrls,
				sshoots,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {},
		};
	}
};

export default GamePage;
