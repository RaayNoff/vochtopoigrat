import clsx from "clsx";
import { FC } from "react";
import { FiSearch } from "react-icons/fi";

import s from "../../styles/components/ui/Searchbar.module.scss";

import Button from "./Button.component";

const Searchbar: FC = () => {
	const searchCallback = () => {
		console.log("callback");
	};

	return (
		<section className={clsx(s.searchbar)}>
			<input
				id="search"
				type="text"
				className={clsx(s.searchbar__input)}
				placeholder="Search games"
			/>
			<Button
				className={clsx(s.searchbar__button)}
				callback={() => searchCallback}
			>
				<FiSearch className={clsx(s.searchbar__loupe)} />
			</Button>
		</section>
	);
};

export default Searchbar;
