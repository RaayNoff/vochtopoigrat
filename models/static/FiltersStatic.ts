import { FilterGenres } from "../../types/filters";

class FiltersStatic {
	genres: FilterGenres[] = [
		{
			id: 1,
			name: "Action",
			slug: "action",
		},
		{
			id: 2,
			name: "Adventure",
			slug: "adventure",
		},
		{
			id: 3,
			name: "RPG",
			slug: "role-playing-games-rpg",
		},
		{
			id: 4,
			name: "Shooter",
			slug: "shooter",
		},
		{
			id: 5,
			name: "Puzzle",
			slug: "puzzle",
		},
		{
			id: 6,
			name: "Platformer",
			slug: "platformer",
		},
		{
			id: 7,
			name: "Massively Multiplayer",
			slug: "massively-multiplayer",
		},
		{
			id: 8,
			name: "Indie",
			slug: "indie",
		},
	];
}

export default new FiltersStatic();
