declare type Rating = {
	id: number;
	title: "exceptional" | "recommended" | "meh" | "skip";
	count: number;
	percent: number;
};

type AddedByStatus = {
	yet: number;
	owned: number;
	beaten: number;
	toplay: number;
	dropped: number;
	playing: number;
};

declare type Platform = {
	id: number;
	name:
		| "PC"
		| "Xbox Series S/X"
		| "PlayStation 4"
		| "PlayStation 3"
		| "Xbox 360"
		| "Xbox One"
		| "PlayStation 5"
		| "Nintendo Switch"
		| "Linux"
		| "macOS"
		| "Android";
	slug:
		| "pc"
		| "xbox-series-x"
		| "playstation4"
		| "playstation3"
		| "xbox360"
		| "xbox-one"
		| "playstation5"
		| "nintendo-switch"
		| "linux"
		| "macos"
		| "android";
	image?: string;
	year_end?: number;
	year_start?: number;
	games_count: number;
	image_background: string;
};

type RequirementsEn = {
	minimum: string;
	recommended: string;
};

type RequirementsRu = {
	minimum: string;
	recommended: string;
};

export type Platforms = {
	platform: Platform;
	released_at: string;
	requirements_en: RequirementsEn;
	requirements_ru: RequirementsRu;
};

type ParentPlatform = {
	id: number;
	name:
		| "PC"
		| "Xbox"
		| "Android"
		| "Apple Macintosh"
		| "Linux"
		| "Nintendo"
		| "PlayStation";
	slug:
		| "pc"
		| "xbox"
		| "android"
		| "mac"
		| "linux"
		| "nintendo"
		| "playstation"
		| "ios";
};

type ParentPlatforms = {
	platform: ParentPlatform;
};

export type GenresName =
	| "Action"
	| "Adventure"
	| "RPG"
	| "Shooter"
	| "Puzzle"
	| "Platformer"
	| "Massively Multiplayer"
	| "Indie";

export type GenresSlug =
	| "action"
	| "adventure"
	| "role-playing-games-rpg"
	| "shooter"
	| "puzzle"
	| "platformer"
	| "massively-multiplayer"
	| "indie";

export type Genre = {
	id: number;
	name: GenresName;
	slug: GenresSlug;
	games_count: number;
	image_background: string;
};

export type StoreName =
	| "PlayStation Store"
	| "Epic Games"
	| "Steam"
	| "Xbox 360 Store"
	| "Xbox Store"
	| "GOG"
	| "Nintendo Store"
	| "Google Play"
	| "App Store";

export type StoreSlug =
	| "playstation-store"
	| "epic-games"
	| "steam"
	| "xbox360"
	| "xbox-store"
	| "gog"
	| "nintendo"
	| "google-play"
	| "apple-appstore";

declare type Store = {
	id: number;
	name: StoreName;
	slug: StoreSlug;
	domain:
		| "store.playstation.com"
		| "epicgames.com"
		| "store.steampowered.com"
		| "marketplace.xbox.com"
		| "microsoft.com"
		| "gog.com"
		| "nintendo.com"
		| "play.google.com"
		| "apps.apple.com";
	games_count: number;
	image_background: string;
};

type Stores = {
	id: number;
	store: Store;
};

export type TagName =
	| "Singleplayer"
	| "Multiplayer"
	| "Steam Achievements"
	| "Atmospheric"
	| "Great Soundtrack"
	| "RPG"
	| "Co-op"
	| "Open World"
	| "First-Person"
	| "Third Person"
	| "Funny"
	| "Sandbox"
	| "Comedy"
	| "Moddable"
	| "Crime"
	| "vr mod"
	| "Story Rich"
	| "Fantasy"
	| "Dark"
	| "Nudity"
	| "Choices Matter"
	| "Mature"
	| "Medieval"
	| "Magic"
	| "Multiple Endings"
	| "FPS"
	| "Female Protagonist";

export type TagSlug =
	| "singleplayer"
	| "multiplayer"
	| "steam-achievements"
	| "atmospheric"
	| "great-soundtrack"
	| "rpg"
	| "co-op"
	| "open-world"
	| "first-person"
	| "third-person"
	| "funny"
	| "sandbox"
	| "comedy"
	| "moddable"
	| "crime"
	| "vr-mod"
	| "story-rich"
	| "fantasy"
	| "dark"
	| "nudity"
	| "choices-matter"
	| "mature"
	| "medieval"
	| "magic"
	| "multiple-endings"
	| "fps"
	| "female-protagonist";

export type Tag = {
	id: number;
	name: TagName;
	slug: TagSlug;
	language: "eng";
	games_count: number;
	image_background: string;
};

type EsrbRating = {
	id: number;
	name: string;
	slug: string;
};

type ShortScreenshot = {
	id: number;
	image: string;
};

declare type Game = {
	id: number;
	slug: string;
	name: string;
	released: string;
	tba: boolean;
	background_image: string;
	rating: number;
	rating_top: number;
	ratings: Rating[];
	ratings_count: number;
	reviews_text_count: number;
	added: number;
	added_by_status: AddedByStatus;
	metacritic: number;
	playtime: number;
	suggestions_count: number;
	updated: Date;
	user_game?: any;
	reviews_count: number;
	saturated_color: string;
	dominant_color: string;
	platforms: Platforms[];
	parent_platforms: ParentPlatforms[];
	genres: Genre[];
	stores: Stores[];
	clip?: any;
	tags: Tag[];
	esrb_rating: EsrbRating;
	short_screenshots: ShortScreenshot[];
};

type Year = {
	year: number;
	count: number;
	nofollow: boolean;
};

type Years = {
	from: number;
	to: number;
	filter: string;
	decade: number;
	years: Year[];
	nofollow: boolean;
	count: number;
};

type Filters = {
	years: Years[];
};

declare type ApiGamesTypes = {
	count: number;
	next: string;
	previous?: string | null;
	results: Game[];
	seo_title: string;
	seo_description: string;
	seo_keywords: string;
	seo_h1: string;
	noindex: boolean;
	nofollow: boolean;
	description: string;
	filters: Filters;
	nofollow_collections: string[];
};

declare type ApiSearchTypes = {
	count: number;
	next: string;
	previous?: string | null;
	results: Game[];
	user_platforms: boolean;
};

declare type ApiReleasesTypes = ApiSearchTypes;

declare type SlidersResponse = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Game[];
	user_platforms: boolean;
};
