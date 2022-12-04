import { FC, useState } from "react";

import { useBodyLock } from "../../hooks/useBodyLock";

import s from "../../styles/components/ui/GameDescription.module.scss";

import Modal from "./Modal.component";

interface IGameDescriptionProps {
	content: string;
}

const GameDescription: FC<IGameDescriptionProps> = ({ content }) => {
	const [isDescriptionOpened, setIsDescriptionOpened] = useState(false);
	const { toggleBodyLock } = useBodyLock();

	const clickHandler = () => {
		toggleBodyLock();
		setIsDescriptionOpened((prev) => !prev);
	};

	return (
		<>
			<p
				onClick={() => clickHandler()}
				className={s.description}
				dangerouslySetInnerHTML={{ __html: content }}
			></p>

			<Modal
				callback={clickHandler}
				state={isDescriptionOpened}
				containerClassName={s.description__container}
			>
				<p dangerouslySetInnerHTML={{ __html: content }}></p>
			</Modal>
		</>
	);
};

export default GameDescription;
