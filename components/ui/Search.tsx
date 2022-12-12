import clsx from "clsx";
import { FC } from "react";
import { FiSearch } from "react-icons/fi";

import s from "../../styles/components/ui/Search.module.scss";

import Button from "./Button.component";

interface ISearchProps {
	value: string;
	handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClickSearch: () => void;
	isDisabled?: boolean;
}

const Search: FC<ISearchProps> = ({
	value,
	handleSearchChange,
	onClickSearch,
	isDisabled,
}) => {
	return (
		<div className={s.search}>
			<input
				id="search"
				type="text"
				className={clsx(s.search__input)}
				placeholder="Search games"
				value={value}
				onChange={(e) => handleSearchChange(e)}
			/>
			<Button
				disabled={isDisabled}
				callback={onClickSearch}
				className={clsx(s.searchbar__button)}
			>
				<FiSearch className={clsx(s.search__loupe)} />
			</Button>
		</div>
	);
};

export default Search;
