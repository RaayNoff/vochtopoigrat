import { FC } from "react";

import { useActions } from "../../hooks/useActions";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import MainLayout from "../../layouts/MainLayout.component";

const Charts: FC = () => {
	return <MainLayout testid="charts-page"></MainLayout>;
};

export default Charts;
