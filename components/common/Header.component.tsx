import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

import { Routes } from "../../models/enums/Routes";
import s from "../../styles/components/common/Header.module.scss";
import Navlink from "../ui/Navlink.component";
import Searchbar from "../ui/Searchbar.component";

const Header: FC = () => {
	return (
		<header className={clsx(s.header)}>
			<div className="container">
				<div className={clsx(s.header__container)}>
					<h1 className={clsx(s.header__title)}>
						<Link href={Routes.HOME}>WhatToPlay</Link>
					</h1>

					<nav className={clsx(s.header__nav, s.nav)}>
						<Navlink href={Routes.HOME} className={s.nav__link} testid="home-link">
							Home
						</Navlink>
						<Navlink
							href={Routes.RANDOM}
							className={s.nav__link}
							testid="random-link"
						>
							Random
						</Navlink>
						<Navlink
							href={Routes.CHARTS}
							className={s.nav__link}
							testid="charts-link"
						>
							Charts
						</Navlink>
						<Navlink
							href={Routes.RELEASES}
							className={s.nav__link}
							testid="releases-link"
						>
							Release calendar
						</Navlink>
					</nav>

					<Searchbar />
				</div>
			</div>
		</header>
	);
};

export default Header;
