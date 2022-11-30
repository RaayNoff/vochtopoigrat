import * as GamesActions from "./Games.actions";
import * as SearchActions from "./Search.actions";
import * as SlidersActions from "./Sliders.actions";

export default {
	...GamesActions,
	...SearchActions,
	...SlidersActions,
};
