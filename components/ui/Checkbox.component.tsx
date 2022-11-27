import clsx from "clsx";
import { FC, useState } from "react";

import { FiCheck } from "react-icons/fi";
import { SiNamebase } from "react-icons/si";

import s from "../../styles/components/ui/Checkbox.module.scss";
import { GenresSlug } from "../../types/filters";

interface ICheckboxProps {
	title: string;
	className?: string;
	name: GenresSlug;
}

const Checkbox: FC<ICheckboxProps> = ({ title, className, name }) => {
	const [checked, setChecked] = useState(false);

	return (
		<label className={clsx(s.checkbox)}>
			<input
				type="checkbox"
				className={clsx(s.checkbox__input, "filterCheckbox")}
				onClick={() => setChecked((prev) => !prev)}
				name={name || ""}
			/>
			<div className={clsx(s.checkbox__custom, s.custom, className)}>
				<div className={s.custom__box}>{checked && <FiCheck />}</div>
				<p className={s.custom__text}>{title}</p>
			</div>
		</label>
	);
};

export default Checkbox;
