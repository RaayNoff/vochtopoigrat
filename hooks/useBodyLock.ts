export const useBodyLock = () => {
	const toggleBodyLock = () => {
		const body = document.querySelector("body");

		if (body) body?.classList.toggle("lock");
	};

	return { toggleBodyLock };
};
