import { RefObject, useEffect, useRef } from "react";

import { selectGames } from "../store/selectors";

import { useActions } from "./useActions";

import { useTypedSelector } from "./useTypedSelector";

export const useGamesLoad = (observableRef: RefObject<HTMLDivElement>) => {
	const { currentPage, isLoading, applyedGenresList, applyedTagsList, next } =
		useTypedSelector(selectGames);

	const { setCurrentPage, fetchNextGamesPage } = useActions();

	const observer = useRef<any>(null);

	useEffect(() => {
		if (isLoading) return;
		if (!next) return;
		if (observer.current) observer.current.disconnect();

		const callback = function (
			entries: IntersectionObserverEntry[],
			observer: IntersectionObserver,
		) {
			if (entries[0].isIntersecting) {
				setCurrentPage(currentPage + 1);
			}
		};

		observer.current = new IntersectionObserver(callback);
		observer.current.observe(observableRef.current);
	}, [isLoading]);

	useEffect(() => {
		if (currentPage === 1) return;

		fetchNextGamesPage({
			page: currentPage,
			genres: applyedGenresList.join(","),
			tags: applyedTagsList.join(","),
		});
	}, [currentPage]);
};
