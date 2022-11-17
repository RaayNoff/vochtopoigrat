import Head from "next/head";
import clsx from "clsx";
import { FC } from "react";

import Header from "../components/common/Header.component";
import s from "../styles/layouts/MainLayout.module.scss";

export interface IMainLayoutProps {
	children?: React.ReactNode;
	title?: string;
	selfClassName?: string;
}
const MainLayout: FC<IMainLayoutProps> = ({
	children,
	selfClassName,
	title = "WTP | Home",
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Header />
			<main className={clsx(selfClassName, s.main)}>{children}</main>
		</>
	);
};

export default MainLayout;
