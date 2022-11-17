import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export const useActiveLinkRef = (linkHref: string, activeClassName: string) => {
	const linkRef = useRef<HTMLAnchorElement>(null);
	const { asPath, isReady } = useRouter();

	useEffect(() => {
		if (isReady) {
			const linkPathname = new URL(linkHref, location.href).pathname;

			const activePathname = new URL(asPath, location.href).pathname;

			if (linkPathname === activePathname) {
				linkRef.current?.classList.add(activeClassName);
			}
		}
	}, [asPath, isReady, activeClassName, linkHref]);

	return linkRef;
};
