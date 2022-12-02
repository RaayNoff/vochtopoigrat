import { FC, memo } from "react";

import { DiAndroid, DiApple, DiLinux, DiWindows } from "react-icons/di";
import { FaPlaystation, FaXbox, FaAppStoreIos } from "react-icons/fa";

import { SiNintendoswitch } from "react-icons/si";

import { ParentPlatform } from "../../types/api";

interface IPlatformIcon {
	platform: ParentPlatform;
}

const PlatformIcon: FC<IPlatformIcon> = memo(({ platform }) => {
	switch (platform.slug) {
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
		case "ios":
			return <FaAppStoreIos />;

		default:
			return null;
	}
});

export default PlatformIcon;
