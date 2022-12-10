import { FC } from "react";

import s from "../../styles/components/common/Footer.module.scss";

const Footer: FC = () => {
	return (
		<footer className={s.footer}>
			<div className="container">
				<div className={s.footer__container}>
					<small className={s.footer__copy}>
						&copy;&nbsp;2022 WhatToPlay&nbsp;| All Rights Reserved
					</small>
					<small className={s.footer__copy}>
						Source of game data - 
							<a href="https://rawg.io/apidocs"> RAWG API </a>
					</small>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
