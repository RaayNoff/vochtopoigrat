import Head from "next/head";
import clsx from "clsx";
import { FC, memo } from "react";

import Header from "../components/common/Header.component";
import s from "../styles/layouts/MainLayout.module.scss";
import Footer from "../components/common/Footer.component";

export interface IMainLayoutProps {
	children?: React.ReactNode;
	title?: string;
	selfClassName?: string;
	testid?: string;
	disableFooter?: boolean;
}
const MainLayout: FC<IMainLayoutProps> = ({
	children,
	selfClassName,
	title = "WTP | Home",
	testid,
	disableFooter,
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
			{!disableFooter && <Footer />}
		</>
	);
};
export default MainLayout;
