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
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="meta/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="meta/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="meta/favicon-16x16.png"
				/>
				<link rel="manifest" href="meta/site.webmanifest" />
				<link rel="mask-icon" href="meta/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="apple-mobile-web-app-title" content="WhatToPlay" />
				<meta name="application-name" content="WhatToPlay" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="msapplication-TileImage" content="meta/mstile-144x144.png" />
				<meta name="theme-color" content="#ffffff" />
				<meta
					name="keywords"
					content="games,fun,play,releases,random,WhatToPlay,charts"
				/>
				<meta
					name="description"
					content="A gaming site that informs players about upcoming new products, allowing you to find a game to your taste using filters or even try your luck and use the random function, hoping that you will get an interesting game"
				/>
				<meta name="owner" content="kraxtv471365@gmail.com" />
				<meta name="author" lang="ru" content="RaayNoff,Clicker,VIOOI" />
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
