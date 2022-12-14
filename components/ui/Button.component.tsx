import { FC, memo } from "react";
import clsx from "clsx";

import s from "../../styles/components/ui/Button.module.scss";

interface IButtonProps {
	children?: React.ReactNode;
	className?: string;
	callback?: () => void;
	disabled?: boolean;
}

const Button: FC<IButtonProps> = memo(
	({ children, callback, className, disabled }) => {
		const clickHandler = () => {
			if (callback) callback();
		};

		return (
			<button
				disabled={disabled}
				onClick={clickHandler}
				className={clsx(s.button, className)}
			>
				{children}
			</button>
		);
	},
);

export default Button;
