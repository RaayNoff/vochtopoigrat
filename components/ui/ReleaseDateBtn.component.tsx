import { FC, memo, useEffect, useState } from "react";
import clsx from "clsx";

import { IReleaseDate } from "../../types/date";
import s from "../../styles/components/ui/ReleaseDateBtn.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectReleases } from "../../store/selectors";

interface IReleaseDateBtnProps {
	date: IReleaseDate;
	className?: string;
	disabled?: boolean;
	index: number;
}

const ReleaseDateBtn: FC<IReleaseDateBtnProps> = memo(
	({
		date: { formatedForBtn, formatedForUrl, month },
		className,
		disabled,
		index,
	}) => {
		const { currentDates } = useTypedSelector(selectReleases);
		const [isSelected, setIsSelected] = useState(false);

		useEffect(() => {
			if (currentDates === formatedForUrl) setIsSelected(true);
			if (currentDates !== formatedForUrl) setIsSelected(false);
		}, [currentDates]);

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
