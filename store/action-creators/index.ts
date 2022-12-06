import * as GamesActions from "./Games.actions";
import * as SearchActions from "./Search.actions";
import * as SlidersActions from "./Sliders.actions";
import * as RandomActions from "./Random.actions";

export default {
	...GamesActions,
	...SearchActions,
	...SlidersActions,
	...RandomActions,
};
