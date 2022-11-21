declare type Rating = {
	id: number;
	title: string;
	count: number;
	percent: number;
}

type AddedByStatus = {
	yet: number;
	owned: number;
	beaten: number;
	toplay: number;
	dropped: number;
	playing: number;
}

declare type Platform = {
	id: number;
	name: string;
	slug: string;
	image?: any;
	year_end?: any;
	year_start?: number;
	games_count: number;
	image_background: string;
}

type RequirementsEn = {
	minimum: string;
	recommended: string;
}

type RequirementsRu = {
	minimum: string;
	recommended: string;
}

type Platforms = {
	platform: Platform;
	released_at: string;
	requirements_en: RequirementsEn;
	requirements_ru: RequirementsRu;
}

type ParentPlatform = {
	id: number;
	name: string;
	slug: string;
}

type ParentPlatforms = {
	platform: ParentPlatform;
}

type Genre = {
	id: number;
	name: string;
	slug: string;
	games_count: number;
	image_background: string;
}

declare type Store = {
	id: number;
	name: string;
	slug: string;
	domain: string;
	games_count: number;
	image_background: string;
}

type Stores = {
	id: number;
	store: Store;
}

declare type Tag = {
	id: number;
	name: string;
	slug: string;
	language: string;
	games_count: number;
	image_background: string;
}

type EsrbRating = {
	id: number;
	name: string;
	slug: string;
}

type ShortScreenshot = {
	id: number;
	image: string;
}

declare type Games = {
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
}

type Year = {
	year: number;
	count: number;
	nofollow: boolean;
}

type Years = {
	from: number;
	to: number;
	filter: string;
	decade: number;
	years: Year[];
	nofollow: boolean;
	count: number;
}

type Filters = {
	years: Years[];
}

declare type ApiGamesTypes = {
	count: number;
	next: string;
	previous?: any;
	results: Games[];
	seo_title: string;
	seo_description: string;
	seo_keywords: string;
	seo_h1: string;
	noindex: boolean;
	nofollow: boolean;
	description: string;
	filters: Filters;
	nofollow_collections: string[];
}
