import clsx from "clsx";
import { FC } from "react";

import s from "../../styles/components/ui/Modal.module.scss";

interface IModalProps {
	state: boolean;
	callback: () => void;
	children?: React.ReactNode;
	containerClassName?: string;
}

const Modal: FC<IModalProps> = ({
	callback,
	state,
	children,
	containerClassName,
}) => {
	return (
		<div
			className={clsx(s.modal, state && s.modal__active)}
			onClick={() => callback()}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className={clsx(s.modal__container, containerClassName)}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
