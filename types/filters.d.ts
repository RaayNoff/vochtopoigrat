export type FilterGenres = {
	id: number;
	name:
		| "Action"
		| "Adventure"
		| "RPG"
		| "Shooter"
		| "Puzzle"
		| "Platformer"
		| "Massively Multiplayer"
		| "Indie";
	slug: GenresSlug;
};

export type GenresSlug =
	| "action"
	| "adventure"
	| "role-playing-games-rpg"
	| "shooter"
	| "puzzle"
	| "platformer"
	| "massively-multiplayer"
	| "indie"
	| null;
