import {
	AddedByStatus,
	EsrbRating,
	Genre,
	ParentPlatforms,
	Rating,
	Tag,
} from "./api";

export interface Platform {
	platform: number;
	name: string;
	slug: string;
}

export interface MetacriticPlatform {
	metascore: number;
	url: string;
	platform: Platform;
}

export interface Reactions {
	1: number;
	2: number;
	3: number;
	4: number;
	5: number;
	6: number;
	7: number;
	8: number;
	9: number;
	10: number;
	11: number;
	12: number;
	14: number;
	15: number;
	16: number;
	18: number;
	20: number;
	21: number;
}

export interface PlatformDetails {
	id: number;
	name: string;
	slug: string;
	image?: any;
	year_end?: any;
	year_start?: number;
	games_count: number;
	image_background: string;
}

export interface Requirements {
	minimum: string;
	recommended: string;
}

export interface Platform {
	platform: PlatformDetails;
	released_at: string;
	requirements: Requirements;
}

export interface StoreDetails {
	id: number;
	name: string;
	slug: string;
	domain: string;
	games_count: number;
	image_background: string;
}

export interface Store {
	id: number;
	url: string;
	store: StoreDetails;
}

export interface Developer {
	id: number;
	name: string;
	slug: string;
	games_count: number;
	image_background: string;
}

export interface Publisher {
	id: number;
	name: string;
	slug: string;
	games_count: number;
	image_background: string;
}

export interface Game {
	id: number;
	slug: string;
	name: string;
	name_original: string;
	description: string;
	metacritic: number;
	metacritic_platforms: MetacriticPlatform[];
	released: string;
	tba: boolean;
	updated: Date;
	background_image: string;
	background_image_additional: string;
	website: string;
	rating: number;
	rating_top: number;
	ratings: Rating[];
	reactions: Reactions;
	added: number;
	added_by_status: AddedByStatus;
	playtime: number;
	screenshots_count: number;
	movies_count: number;
	creators_count: number;
	achievements_count: number;
	parent_achievements_count: number;
	reddit_url: string;
	reddit_name: string;
	reddit_description: string;
	reddit_logo: string;
	reddit_count: number;
	twitch_count: number;
	youtube_count: number;
	reviews_text_count: number;
	ratings_count: number;
	suggestions_count: number;
	alternative_names: string[];
	metacritic_url: string;
	parents_count: number;
	additions_count: number;
	game_series_count: number;
	user_game?: any;
	reviews_count: number;
	saturated_color: string;
	dominant_color: string;
	parent_platforms: ParentPlatforms[];
	platforms: Platform[];
	stores: Store[];
	developers: Developer[];
	genres: Genre[];
	tags: Tag[];
	publishers: Publisher[];
	esrb_rating: EsrbRating;
	clip?: any;
	description_raw: string;
}

export interface Screenshoot {
	id: number;
	image: string;
	width: number;
	height: number;
	is_deleted: boolean;
}

export interface ScreenshotsResponse {
	count: number;
	next?: any;
	previous?: any;
	results: Screenshoot[];
}

export interface StoreResponse {
	count: number;
	next: any;
	previos: any;
	results: StoreDetailed[];
}

export interface StoreDetailed {
	id: number;
	game_id: number;
	store_id: number;
	url: string;
}
