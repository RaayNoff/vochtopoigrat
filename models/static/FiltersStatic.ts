import { FilterGenres, FilterStores, FilterTags } from "../../types/filters";

class FiltersStatic {
	genres: readonly FilterGenres[] = [
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

	tags: readonly FilterTags[] = [
		{ id: 1, name: "Atmospheric", slug: "atmospheric" },
		{ id: 2, name: "Choices Matter", slug: "choices-matter" },
		{ id: 3, name: "Co-op", slug: "co-op" },
		{ id: 4, name: "Comedy", slug: "comedy" },
		{ id: 5, name: "Crime", slug: "crime" },
		{ id: 6, name: "Dark", slug: "dark" },
		{ id: 7, name: "Fantasy", slug: "fantasy" },
		{ id: 8, name: "Female Protagonist", slug: "female-protagonist" },
		{ id: 9, name: "First-Person", slug: "first-person" },
		{ id: 10, name: "Funny", slug: "funny" },
		{ id: 11, name: "Great Soundtrack", slug: "great-soundtrack" },
		{ id: 12, name: "Magic", slug: "magic" },
		{ id: 13, name: "Mature", slug: "mature" },
		{ id: 14, name: "Medieval", slug: "medieval" },
		{ id: 15, name: "Moddable", slug: "moddable" },
		{ id: 16, name: "Multiplayer", slug: "multiplayer" },
		{ id: 17, name: "Multiple Endings", slug: "multiple-endings" },
		{ id: 18, name: "Nudity", slug: "nudity" },
		{ id: 19, name: "Open World", slug: "open-world" },
		{ id: 20, name: "RPG", slug: "rpg" },
		{ id: 21, name: "Sandbox", slug: "sandbox" },
		{ id: 22, name: "Singleplayer", slug: "singleplayer" },
		{ id: 23, name: "Steam Achievements", slug: "steam-achievements" },
		{ id: 24, name: "Story Rich", slug: "story-rich" },
		{ id: 25, name: "Third Person", slug: "third-person" },
		{ id: 26, name: "vr mod", slug: "vr-mod" },
	];

	stores: readonly FilterStores[] = [
		{
			id: 1,
			name: "App Store",
			slug: "apple-appstore",
		},
		{
			id: 2,
			name: "Epic Games",
			slug: "epic-games",
		},
		{
			id: 3,
			name: "GOG",
			slug: "gog",
		},
		{
			id: 4,
			name: "Google Play",
			slug: "google-play",
		},
		{
			id: 5,
			name: "Nintendo Store",
			slug: "nintendo",
		},
		{
			id: 6,
			name: "PlayStation Store",
			slug: "playstation-store",
		},
		{
			id: 7,
			name: "Steam",
			slug: "steam",
		},
		{
			id: 8,
			name: "Xbox 360 Store",
			slug: "xbox360",
		},
		{
			id: 9,
			name: "Xbox Store",
			slug: "xbox-store",
		},
	];
}

export default new FiltersStatic();
