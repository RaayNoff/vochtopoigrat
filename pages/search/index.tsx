import clsx from "clsx";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

import GameItem from "../../components/ui/GameItem.component";
import Loader from "../../components/ui/Loader.component";

import Search from "../../components/ui/Search";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import MainLayout from "../../layouts/MainLayout.component";
import { Routes } from "../../models/enums/Routes";
import { selectSearchPage } from "../../store/selectors";

import s from "../../styles/pages/Search.module.scss";

const SearchPage: NextPage = () => {
	const { searchQuery, results, isLoading, next, currentPage } =
		useTypedSelector(selectSearchPage);
	const {
		setSearchPageQuery,
		fetchSearchPageResults,
		fetchSearchPageSomePage,
		setSearchPageCurrentPage,
	} = useActions();

	const router = useRouter();

	const lastElemRef = useRef<HTMLDivElement>(null);
	const observer = useRef<any>(null);

	useEffect(() => {
		if (isLoading) return;
		if (!next) return;
		if (observer.current) observer.current.disconnect();

		const callback = function (
			entries: IntersectionObserverEntry[],
			_: IntersectionObserver,
		) {
			if (entries[0].isIntersecting) {
				setSearchPageCurrentPage(currentPage + 1);
			}
		};

		observer.current = new IntersectionObserver(callback);
		observer.current.observe(lastElemRef.current);
	}, [isLoading]);

	useEffect(() => {
		if (currentPage === 1) return;
		fetchSearchPageSomePage({
			pageNumber: currentPage,
			searchQuery: searchQuery,
		});
	}, [currentPage]);

	useEffect(() => {
		if (router.query.q?.length) {
			setSearchPageCurrentPage(1);
			setSearchPageQuery(router.query.q.toString());
			fetchSearchPageResults(router.query.q.toString());
		}
	}, [router]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchPageQuery(e.target.value);
	};

	const onClickSearch = () => {
		if (searchQuery.length) {
			setSearchPageCurrentPage(1);
			fetchSearchPageResults(searchQuery);
			router.push(
				{
					pathname: Routes.SEARCH,
					query: {
						q: searchQuery,
					},
				},
				undefined,
				{
					shallow: true,
				},
			);
		}
	};

	return (
		<MainLayout title="WTP | Search" selfClassName={s.search}>
			<div className="container">
				<div className={s.search__container}>
					<div className={clsx(s.search__input, s.input)}>
						<div className={s.input__container}>
							<Search
								isDisabled={isLoading}
								value={searchQuery}
								handleSearchChange={handleSearchChange}
								onClickSearch={onClickSearch}
							/>
						</div>
					</div>
					{!results.length && !isLoading && (
						<p className={s.search__nores}>No results :(</p>
					)}
					{!results.length && isLoading && <Loader className={s.search__loader} />}

					<ul className={clsx(s.search__results, s.results)}>
						{results.map((game) => (
							<li key={game.id} className={s.results__item}>
								<GameItem
									name={game.name}
									picture={game.background_image}
									platforms={game.parent_platforms}
									id={game.id}
								/>
							</li>
						))}
					</ul>
					{next && !isLoading && (
						<div style={{ width: "100%", height: 1 }} ref={lastElemRef}></div>
					)}
				</div>
			</div>
		</MainLayout>
	);
};

export default SearchPage;
