import clsx from "clsx";
import { FC } from "react";

import s from "../../styles/components/common/Filters.module.scss";
import Button from "../ui/Button.component";
import Checkbox from "../ui/Checkbox.component";

import Accordion from "./Accordion.component";

const Filters: FC = () => {
	const handleReset = (e: MouseEvent) => {};

	return (
		<aside className={clsx(s.filters)}>
			<Accordion title="Genres">
				<Checkbox name="Action" />
			</Accordion>
			<Button
				callback={(e: MouseEvent) => handleReset(e)}
				className={s.filters__reset}
			>
				Reset
			</Button>
		</aside>
	);
};

export default Filters;
