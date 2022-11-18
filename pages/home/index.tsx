import { FC } from "react";

import ReleaseList from "../../components/common/ReleaseList.component";

import MainLayout from "../../layouts/MainLayout.component";

const Home: FC = () => {
	return (
		<MainLayout testid="home-page">
			<ReleaseList />
		</MainLayout>
	);
};

export default Home;
