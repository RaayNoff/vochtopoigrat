import clsx from "clsx";
import { FC, useState, useRef, useEffect } from "react";

import { FiCheck } from "react-icons/fi";

import s from "../../styles/components/ui/Checkbox.module.scss";

interface ICheckboxProps {
	name: string;
}

const Checkbox: FC<ICheckboxProps> = ({ name }) => {
	const [checked, setChecked] = useState(false);

	const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
		setChecked((prev) => !prev);
	};

	return (
		<label className={clsx(s.checkbox)}>
			<input
				type="checkbox"
				className={clsx(s.checkbox__input)}
				onClick={(e) => handleClick(e)}
			/>
			<div className={clsx(s.checkbox__custom, s.custom)}>
				<div className={s.custom__box}>{checked && <FiCheck />}</div>
				<p className={s.custom__text}>{name}</p>
			</div>
		</label>
	);
};

export default Checkbox;
