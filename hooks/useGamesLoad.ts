import { RefObject, useEffect, useRef } from "react";

import { useActions } from "./useActions";

import { useTypedSelector } from "./useTypedSelector";

export const useGamesLoad = (observableRef: RefObject<HTMLDivElement>) => {
	const {
		currentPage,
		isLoading,
		next: isNextPageAvailable,
	} = useTypedSelector((state) => state.games);
	const { setCurrentPage, fetchNextGamesPage } = useActions();

	const observer = useRef<any>(null);

	useEffect(() => {
		if (isLoading) return;
		if (observer.current) observer.current.disconnect();
		const callback = function (
			entries: IntersectionObserverEntry[],
			observer: IntersectionObserver,
		) {
			if (entries[0].isIntersecting && isNextPageAvailable) {
				setCurrentPage(currentPage + 1);
			}
		};
		observer.current = new IntersectionObserver(callback);
		observer.current.observe(observableRef.current);
	}, [isLoading]);

	useEffect(() => {
		if (currentPage === 1) return;

		fetchNextGamesPage(currentPage);
	}, [currentPage]);
};
