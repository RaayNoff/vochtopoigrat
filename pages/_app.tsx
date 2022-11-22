import "../styles/globals.scss";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";

import { createReduxStore } from "../store";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={createReduxStore()}>
			<NextNProgress
				color="#29D"
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				showOnShallow={true}
			/>
			<Component {...pageProps} />
		</Provider>
	);
}
