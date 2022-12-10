import Link from "next/link";
import clsx from "clsx";
import { FC, memo } from "react";

import { useActiveLinkRef } from "../../hooks/useActiveLinkRef";
import s from "../../styles/components/ui/Navlink.module.scss";

interface INavlinkProps {
	href: string;
	children?: React.ReactNode;
	className?: string;
	testid?: string;
}

const Navlink: FC<INavlinkProps> = memo(
	({ className, href, children, testid }) => {
		const linkRef = useActiveLinkRef(href, s.active);

		return (
			<Link
				href={href}
				className={clsx(s.navlink, className)}
				ref={linkRef}
				data-testid={testid}
			>
				{children}
			</Link>
		);
	},
);
export default Navlink;
