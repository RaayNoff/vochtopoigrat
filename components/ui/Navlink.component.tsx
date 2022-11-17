import Link from "next/link";
import clsx from "clsx";
import { FC } from "react";

import { useActiveLinkRef } from "../../hooks/useActiveLinkRef";
import s from "../../styles/components/ui/Navlink.module.scss";

interface INavlinkProps {
	href: string;
	children?: React.ReactNode;
	className?: string;
}

const Navlink: FC<INavlinkProps> = ({ className, href, children }) => {
	const linkRef = useActiveLinkRef(href, s.active);

	return (
		<Link href={href} className={clsx(s.navlink, className)} ref={linkRef}>
			<span className={s.navlink__text}>{children}</span>
		</Link>
	);
};

export default Navlink;
