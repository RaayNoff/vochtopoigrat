import { FC, useCallback } from "react";
import clsx from "clsx";

import s from "../../styles/components/common/Filters.module.scss";
import Button from "../ui/Button.component";
import Checkbox from "../ui/Checkbox.component";
import { useFitlers } from "../../hooks/useFilters";
import FiltersStatic from "../../models/static/FiltersStatic";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectGames } from "../../store/selectors";

import Accordion from "./Accordion.component";

const Filters: FC = () => {
	const { handleClick, resetFilters } = useFitlers();
	const { isLoading } = useTypedSelector(selectGames);

	const resetHandler = useCallback(() => resetFilters(), []);

	return (
		<aside className={clsx(s.filters)} onClick={(e) => handleClick(e)}>
			<Accordion
				title="Genres"
				className={s.accordion}
				availableCondition={isLoading}
			>
				{FiltersStatic.genres.map((g) => (
					<Checkbox
						name={`genre-${g.slug}`}
						className={s.filters__checkbox}
						key={g.id}
						title={g.name}
					/>
				))}
			</Accordion>
			<Accordion
				title="Tags"
				className={s.accordion}
				availableCondition={isLoading}
			>
				{FiltersStatic.tags.map((t) => (
					<Checkbox
						key={t.id}
						title={t.name}
						name={`tag-${t.slug}`}
						className={s.filters__checkbox}
					/>
				))}
			</Accordion>
			<Accordion
				title="Stores"
				className={s.accordion}
				availableCondition={isLoading}
			>
				{FiltersStatic.stores.map((st) => (
					<Checkbox
						key={st.id}
						title={st.name}
						name={`store-${st.id}`}
						className={s.filters__checkbox}
					/>
				))}
			</Accordion>

			<Button callback={resetHandler} className={s.filters__reset}>
				Reset
			</Button>
		</aside>
	);
};

export default Filters;
