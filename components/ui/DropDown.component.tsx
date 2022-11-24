import clsx from "clsx";
import { FC, RefObject, forwardRef } from "react";

import s from "../../styles/components/ui/DropDown.module.scss";

interface IDropDownProps {
	children?: React.ReactNode;
	isVisible?: boolean;
	// ref?: RefObject<HTMLElement>;
}

const DropDown: FC<IDropDownProps> = ({ children, isVisible }) => {
	return (
		<menu className={clsx(s.dropDown, isVisible && s.dropDown__visible)}>
			<div className={s.dropDown__container}>{children}</div>
		</menu>
	);
};

export default DropDown;
