import { useCallback, useRef, useState } from "react";

export const useHover = () => {
	const [value, setValue] = useState(false);

	const handleMouseOver = useCallback(() => setValue(true), []);
	const handleMouseOut = useCallback(() => setValue(false), []);

	const ref = useRef<HTMLElement>();

	const callbackRef = useCallback(
		(node: HTMLElement) => {
			if (ref.current) {
				ref.current.removeEventListener("mouseover", handleMouseOver);
				ref.current.removeEventListener("mouseout", handleMouseOut);
			}

			ref.current = node;

			if (ref.current) {
				ref.current.addEventListener("mouseover", handleMouseOver);
				ref.current.addEventListener("mouseout", handleMouseOut);
			}
		},
		[handleMouseOver, handleMouseOut],
	);

	return { callbackRef, value };
};
