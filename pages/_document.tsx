import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/meta/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/meta/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/meta/favicon-16x16.png"
				/>
				<link rel="manifest" href="/meta/site.webmanifest" />
				<link rel="mask-icon" href="/meta/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="apple-mobile-web-app-title" content="WhatToPlay" />
				<meta name="application-name" content="WhatToPlay" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="msapplication-TileImage" content="/meta/mstile-144x144.png" />
				<meta name="theme-color" content="#ffffff" />
				<meta
					name="keywords"
					content="games,fun,play,releases,random,WhatToPlay,charts"
				/>
				<meta
					name="description"
					content="A gaming site that informs players about upcoming new products, allowing you to find a game to your taste using filters or even try your luck and use the random function, hoping that you will get an interesting game"
				/>
				<meta name="owner" content="kraxtv471365@gmail.com" />
				<meta name="author" lang="ru" content="RaayNoff,Clicker,VIOOI" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
