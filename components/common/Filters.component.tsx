import { FC } from "react";
import clsx from "clsx";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import s from "../../styles/components/common/Filters.module.scss";
import Button from "../ui/Button.component";
import Checkbox from "../ui/Checkbox.component";
import { useFitlers } from "../../hooks/useFilters";
import FiltersStatic from "../../models/static/FiltersStatic";

import Accordion from "./Accordion.component";

const Filters: FC = () => {
	const { handleClick, resetFilters, isRestricted } = useFitlers();

	return (
		<aside className={clsx(s.filters)} onClick={(e) => handleClick(e)}>
			<Accordion
				title="Genres"
				className={s.accordion}
				availableCondition={isRestricted}
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
				availableCondition={isRestricted}
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

			<Button callback={() => resetFilters()} className={s.filters__reset}>
				Reset
			</Button>
		</aside>
	);
};

export default Filters;
