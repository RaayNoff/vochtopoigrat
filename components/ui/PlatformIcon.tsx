import { FC } from "react";

import { DiAndroid, DiApple, DiLinux, DiWindows } from "react-icons/di";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";

interface IPlatformIconProps {
	platform: string;
}

const PlatformIcon: FC<IPlatformIconProps> = ({ platform }) => {
	switch (platform) {
		case "android":
			return <DiAndroid />;
		case "linux":
			return <DiLinux />;
		case "mac":
			return <DiApple />;
		case "nintendo":
			return <SiNintendoswitch />;
		case "pc":
			return <DiWindows />;
		case "playstation":
			return <FaPlaystation />;
		case "xbox":
			return <FaXbox />;

		default:
			return <></>;
	}
};

export default PlatformIcon;
