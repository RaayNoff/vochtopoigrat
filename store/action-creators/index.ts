import * as GamesActions from "./Games.actions";
import * as SearchActions from "./Search.actions";
import * as SlidersActions from "./Sliders.actions";
import * as RandomActions from "./Random.actions";
import * as ReleasesActions from "./Releases.actions";
import * as SearchPageActions from "./SearchPage.actions";

export default {
	...GamesActions,
	...SearchActions,
	...SlidersActions,
	...RandomActions,
	...ReleasesActions,
	...SearchPageActions,
};
