import { useRouter } from "next/router";

import { useEffect } from "react";

import { Routes } from "../models/enums/Routes";

export default function () {
	const router = useRouter();
	useEffect(() => {
		router.push(Routes.HOME);
	}, []);

	return <></>;
}
