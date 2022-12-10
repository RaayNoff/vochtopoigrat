import { FC, memo } from "react";
import clsx from "clsx";

import { IReleaseDate } from "../../types/date";
import s from "../../styles/components/ui/ReleaseDateBtn.module.scss";

interface IReleaseDateBtnProps {
	date: IReleaseDate;
	className?: string;
	disabled?: boolean;
	index: number;
	isSelected?: boolean;
}

const ReleaseDateBtn: FC<IReleaseDateBtnProps> = memo(
	({
		date: { formatedForBtn, month },
		className,
		disabled,
		index,
		isSelected,
	}) => {
		return (
			<>
				<button
					data-index={index}
					disabled={disabled}
					className={clsx(s.month, className, isSelected && s.month__active)}
				>
					{formatedForBtn}
				</button>
				{month === 12 && <span className={s.month__separator}></span>}
			</>
		);
	},
);

export default ReleaseDateBtn;
