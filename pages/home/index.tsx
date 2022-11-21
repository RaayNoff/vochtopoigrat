import { FC } from "react";

import Carousel from "../../components/common/Carousel.component";

import ReleaseList from "../../components/common/ReleaseList.component";

import MainLayout from "../../layouts/MainLayout.component";

const Home: FC = () => {
	return (
		<MainLayout testid="home-page">
			<Carousel />

			{/* <ReleaseList /> */}
		</MainLayout>
	);
};

export default Home;
