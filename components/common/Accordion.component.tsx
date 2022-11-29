import clsx from "clsx";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { FC, useState } from "react";

import { FiChevronDown } from "react-icons/fi";

import s from "../../styles/components/common/Accordion.module.scss";

interface IAccordionProps {
	children?: React.ReactNode;
	title?: string;
	className?: string;
	availableCondition?: boolean;
}

const Accordion: FC<IAccordionProps> = ({
	children,
	title = "accordion",
	className,
	availableCondition,
}) => {
	const [opened, setOpened] = useState(false);

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.currentTarget.classList.contains(s.accordion__header))
			setOpened((prev) => !prev);
	};

	return (
		<article className={clsx(s.accordion, className)}>
			<header
				className={clsx(s.accordion__header, s.header)}
				onClick={(e) => handleClick(e)}
			>
				<FiChevronDown
					className={clsx(s.header__chevron, opened && s.header__opened)}
				/>
				<span className={clsx(s.header__title)}>{title}</span>
			</header>
			<footer
				className={clsx(
					s.accordion__content,
					s.content,
					opened && s.content__opened,
					availableCondition && s.content__restricted,
				)}
			>
				<OverlayScrollbarsComponent
					defer
					options={{
						overflow: {
							y: "scroll",
							x: "hidden",
						},
						scrollbars: {
							visibility: "auto",
							autoHide: "never",
							autoHideDelay: 1300,
							dragScroll: true,
							clickScroll: false,
						},
						paddingAbsolute: false,
					}}
					className={clsx(s.content__wrapper, opened && s.content__wrapper_opened)}
				>
					{children}
				</OverlayScrollbarsComponent>
			</footer>
		</article>
	);
};

export default Accordion;
