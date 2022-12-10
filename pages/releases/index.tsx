import clsx from "clsx";
import { GetServerSideProps, NextPage } from "next";
import { MouseEvent, useEffect, useRef } from "react";

import Loader from "../../components/ui/Loader.component";

import ReleaseDateBtn from "../../components/ui/ReleaseDateBtn.component";
import ReleaseGameItem from "../../components/ui/ReleaseGameItem.component";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import MainLayout from "../../layouts/MainLayout.component";
import DateService from "../../services/Date.service";
import { selectReleases } from "../../store/selectors";
import s from "../../styles/pages/Releases.module.scss";
import { ApiReleasesTypes, Game } from "../../types/api";
import { IReleaseDate } from "../../types/date";

interface IReleasesProps {
	dates: IReleaseDate[];
	currentDate: IReleaseDate;
	initialReleases: Game[];
	nextPage: string | null;
}

const Releases: NextPage<IReleasesProps> = ({
	currentDate,
	dates,
	initialReleases,
	nextPage,
}) => {
	const { currentReleases, isLoading, currentTitle, next, page, currentDates } =
		useTypedSelector(selectReleases);
	const {
		setReleases,
		fetchReleases,
		setNextPage,
		fetchNextReleases,
		setCurrentDates,
		setCurrentTitle,
		setReleasesPage,
	} = useActions();

	const lastElemRef = useRef<HTMLDivElement>(null);
	const observer = useRef<any>(null);
	useEffect(() => {
		console.log(nextPage);
		setNextPage(nextPage);
		setReleases(initialReleases);
		setCurrentDates(currentDate?.formatedForUrl);
		setCurrentTitle(currentDate?.formatedForDisplay);
	}, [initialReleases]);

	useEffect(() => {
		if (isLoading) return;
		if (!next) return;
		if (observer.current) observer.current.disconnect();

		const callback = function (
			entries: IntersectionObserverEntry[],
			_: IntersectionObserver,
		) {
			if (entries[0].isIntersecting) {
				console.log("Залупа в объективе");
				setReleasesPage(page + 1);
			}
		};

		observer.current = new IntersectionObserver(callback);
		observer.current.observe(lastElemRef.current);
	}, [isLoading]);

	useEffect(() => {
		if (page === 1) return;

		fetchNextReleases({
			dates: currentDates,
			page: page,
		});
	}, [page]);

	const onMonthClick = (e: MouseEvent<HTMLElement>) => {
		if (isLoading) return;
		const target = e.target as HTMLButtonElement;

		if (target.dataset.index) {
			const index = Number(target.dataset.index);

			setNextPage(null);
			setReleasesPage(1);
			fetchReleases(dates[index].formatedForUrl);
			setCurrentDates(dates[index].formatedForUrl);
			setCurrentTitle(dates[index].formatedForDisplay);
		}
	};

	return (
		<MainLayout
			testid="releases-page"
			title="WTP | Release calendar"
			selfClassName={s.releases}
		>
			<div className="container">
				<div className={s.releases__container}>
					<h1 className={s.releases__title}>{currentTitle}</h1>
					<ul
						className={clsx(s.releases__months, s.months)}
						onClick={(e) => onMonthClick(e)}
					>
						{dates?.map((date, i) => (
							<li className={s.months__item} key={i}>
								<ReleaseDateBtn index={i} date={date} />
							</li>
						))}
					</ul>

					<ul className={clsx(s.releases__list, s.list)}>
						{currentReleases?.map((rel) => (
							<li className={clsx(s.list__item)} key={rel.id}>
								<ReleaseGameItem game={rel} />
							</li>
						))}

						{!isLoading && next && (
							<div style={{ height: "1px", width: "100%" }} ref={lastElemRef}></div>
						)}
					</ul>

					{isLoading && <Loader className={s.releases__loader} />}
				</div>
			</div>
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const options = { method: "GET" };
		const urls = {
			releases: `${process.env.NEXT_PUBLIC_API_URL}?key=${process.env.NEXT_PUBLIC_API_KEY}&page_size=10&dates=`,
		};
		const { dates, currentDate } = DateService.getReleaseDates();

		const { results: initialReleases, next }: ApiReleasesTypes = await fetch(
			urls.releases + currentDate.formatedForUrl,
			options,
		).then((data) => data.json());

		return {
			props: {
				dates,
				currentDate,
				initialReleases,
				nextPage: next,
			},
		};
	} catch (error) {
		return {
			props: {
				dates: [] as IReleaseDate[],
				currentDate: {} as IReleaseDate,
				initialReleases: [] as Game[],
				nextPage: null,
			},
		};
	}
};

export default Releases;
