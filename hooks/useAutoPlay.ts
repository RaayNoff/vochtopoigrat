import { useEffect, useRef } from "react";

import { useHover } from "./useHover";

export const useAutoPlay = (playCallback: () => void, ...deps: any[]) => {
	const autoPlay = useRef({} as NodeJS.Timeout);

	const { callbackRef, value: condition } = useHover();

	useEffect(() => {
		if (condition) {
			clearTimeout(autoPlay.current);
			return;
		}

		autoPlay.current = setTimeout(() => {
			console.log("Autoplay");
			playCallback();
		}, 4500);

		return () => {
			clearTimeout(autoPlay.current);
		};
	}, [deps, condition]);

	return { callbackRef, condition };
};
