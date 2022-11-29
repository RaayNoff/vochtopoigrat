import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import MainLayout from "../layouts/MainLayout.component";
import { Routes } from "../models/enums/Routes";
import s from "../styles/pages/Error.module.scss";

interface IErrorProps {
	statusCode?: number;
	statusMessage?: string;
}

const Error: NextPage<IErrorProps> = ({ statusCode, statusMessage }) => {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push(Routes.HOME);
		}, 2500);
	}, []);

	return (
		<MainLayout disableFooter={true} selfClassName={s.error}>
			<div className="container">
				<div className={s.error__container}>
					<h1 className={s.error__statusCode}>{statusCode}</h1>
					<div className={s.error__statusMessage}>
						{statusMessage ? (
							statusMessage
						) : (
							<span className={s.error__statusMessage_message}>Page not found</span>
						)}
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	const statusMessage = res
		? res.statusMessage
		: err
		? err.message
		: "page not found";
	return { statusCode, statusMessage };
};

export default Error;
