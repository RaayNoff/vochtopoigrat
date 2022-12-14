import { NextPage } from "next";
import { useCallback, useEffect } from "react";

import Button from "../../components/ui/Button.component";
import s from "../../styles/pages/Random.module.scss";

import MainLayout from "../../layouts/MainLayout.component";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectRandom } from "../../store/selectors";
import { useActions } from "../../hooks/useActions";
import GameItem from "../../components/ui/GameItem.component";
import Loader from "../../components/ui/Loader.component";

const Random: NextPage = () => {
	const { error, game, isLoading, score } = useTypedSelector(selectRandom);
	const { fetchRandomGame, setScore, initScore } = useActions();

	useEffect(() => {
		if (isLoading) return;
		fetchRandomGame();
		initScore();
	}, []);

	const clickHandler = useCallback(() => {
		setScore(score + Math.ceil(Math.random() * 10));
		fetchRandomGame();
	}, [score]);

	return (
		<MainLayout testid="random-page" selfClassName={s.random}>
			<div className="container">
				<div className={s.random__container}>
					<h2 className={s.random__score}>
						Your score: <span>{score}</span>
					</h2>
					<Button
						disabled={isLoading}
						callback={clickHandler}
						className={s.random__button}
					>
						Random
					</Button>
					{!isLoading && game && (
						<GameItem
							id={game.id}
							name={game.name}
							picture={game.background_image}
							platforms={game.parent_platforms}
							className={s.random__game}
						/>
					)}
					{!game && isLoading && <Loader className={s.random__loader} />}
					{!game && !isLoading && <h3 className={s.random__fortune}>{error}</h3>}
				</div>
			</div>
		</MainLayout>
	);
};

export default Random;
