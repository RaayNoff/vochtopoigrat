import { FC } from "react";
import clsx from "clsx";

import s from "../../styles/components/ui/Button.module.scss";

interface IButtonProps {
	children?: React.ReactNode;
	className?: string;
	callback?: () => void;
}

const Button: FC<IButtonProps> = ({ children, callback, className }) => {
	const clickHandler = () => {
		if (callback) callback();
	};

	return (
		<button onClick={clickHandler} className={clsx(s.button, className)}>
			{children}
		</button>
	);
};

export default Button;
