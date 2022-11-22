import Head from "next/head";
import clsx from "clsx";
import { FC } from "react";

import Header from "../components/common/Header.component";
import s from "../styles/layouts/MainLayout.module.scss";
import Footer from "../components/common/Footer.component";

export interface IMainLayoutProps {
	children?: React.ReactNode;
	title?: string;
	selfClassName?: string;
	testid?: string;
}
const MainLayout: FC<IMainLayoutProps> = ({
	children,
	selfClassName,
	title = "WTP | Home",
	testid,
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Header />
			<main data-testid={testid} className={clsx(selfClassName, s.main)}>
				{children}
			</main>
			<Footer />
		</>
	);
};

export default MainLayout;
