import { useRouter } from "next/router";

import { useEffect } from "react";

import { Route } from "../models/enums/Routes";

export default function () {
	const router = useRouter();
	useEffect(() => {
		router.push(Route.HOME);
	}, []);

	return <></>;
}
