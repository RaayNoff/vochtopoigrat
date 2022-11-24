import clsx from "clsx";
import { FC, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

import { useActions } from "../../hooks/useActions";
import { useDebounce } from "../../hooks/useDebounce";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import s from "../../styles/components/ui/Searchbar.module.scss";

import Button from "./Button.component";
import DropDown from "./DropDown.component";
import Loader from "./Loader.component";
import SearchGameItem from "./SearchGameItem.component";

const Searchbar: FC = () => {
	const { isSearchActive, searchQuery, searchResult, isLoading } =
		useTypedSelector((state) => state.search);

	const { setSearchBarActive, setSearchQuery, fetchSearch } = useActions();

	const debouncedSearch = useDebounce(fetchSearch, 500);

	useEffect(() => {
		if (searchQuery.length && !isSearchActive) setSearchBarActive(true);
		else if (!searchQuery.length && isSearchActive) setSearchBarActive(false);
	}, [searchQuery, isSearchActive]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		debouncedSearch(searchQuery);
	};

	return (
		<section className={clsx(s.searchbar)}>
			<input
				id="search"
				type="text"
				className={clsx(s.searchbar__input)}
				placeholder="Search games"
				value={searchQuery}
				onChange={(e) => handleSearchChange(e)}
			/>
			<Button className={clsx(s.searchbar__button)}>
				<FiSearch className={clsx(s.searchbar__loupe)} />
			</Button>

			<DropDown isVisible={isSearchActive}>
				{!isLoading ? (
					searchResult?.map((game) => (
						<SearchGameItem key={game.id} gameId={game.id}></SearchGameItem>
					))
				) : (
					<Loader className={s.loader} />
				)}
				{!searchResult.length && !isLoading && (
					<p className={s.searchbar__noGames}>No games found</p>
				)}
			</DropDown>
		</section>
	);
};

export default Searchbar;
