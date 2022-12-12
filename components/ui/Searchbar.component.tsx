import clsx from "clsx";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useActions } from "../../hooks/useActions";
import { useDebounce } from "../../hooks/useDebounce";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Routes } from "../../models/enums/Routes";
import { selectSearch } from "../../store/selectors";

import s from "../../styles/components/ui/Searchbar.module.scss";

import DropDown from "./DropDown.component";
import Loader from "./Loader.component";
import Search from "./Search";
import SearchGameItem from "./SearchGameItem.component";

interface ISearchbarProps {
	className?: string;
}

const Searchbar: FC<ISearchbarProps> = ({ className }) => {
	const { isSearchActive, searchQuery, searchResult, isLoading } =
		useTypedSelector(selectSearch);
	const router = useRouter();

	const { setSearchBarActive, setSearchQuery, fetchSearch } = useActions();

	const searchbarRef = useRef<HTMLElement>(null);
	useOutsideClick(searchbarRef, () => {
		setSearchBarActive(false);
		setSearchQuery("");
	});

	useEffect(() => {
		if (searchQuery.length && !isSearchActive) setSearchBarActive(true);
		else if (!searchQuery.length && isSearchActive) setSearchBarActive(false);
	}, [searchQuery, isSearchActive]);

	const debouncedSearch = useDebounce(fetchSearch, 500);

	useEffect(() => {
		if (!searchQuery.length) return;
		debouncedSearch(searchQuery);
	}, [searchQuery]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const onClickSearch = useCallback(() => {
		router.push({
			pathname: Routes.SEARCH,
			query: {
				q: searchQuery,
			},
		});
	}, [searchQuery]);

	return (
		<section ref={searchbarRef} className={clsx(s.searchbar, className)}>
			<Search
				value={searchQuery}
				handleSearchChange={handleSearchChange}
				onClickSearch={onClickSearch}
			/>

			<DropDown isVisible={isSearchActive}>
				{!isLoading ? (
					searchResult?.map((game) => (
						<SearchGameItem key={game.id} gameId={game.id} />
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
