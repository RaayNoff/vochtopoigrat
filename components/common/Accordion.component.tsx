import clsx from "clsx";
import { FC, useState } from "react";

import { FiChevronDown } from "react-icons/fi";

import s from "../../styles/components/common/Accordion.module.scss";

interface IAccordionProps {
	children?: React.ReactNode;
	title?: string;
}

const Accordion: FC<IAccordionProps> = ({ children, title = "accordion" }) => {
	const [opened, setOpened] = useState(false);

	return (
		<article className={s.accordion} onClick={() => setOpened((prev) => !prev)}>
			<header className={clsx(s.accordion__header, s.header)}>
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
				)}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</footer>
		</article>
	);
};

export default Accordion;
