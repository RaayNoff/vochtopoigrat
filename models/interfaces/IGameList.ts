interface Rating {
	id: number;
	title: string;
	count: number;
	percent: number;
}

interface AddedByStatus {
	yet: number;
	owned: number;
	beaten: number;
	toplay: number;
	dropped: number;
	playing: number;
}

interface Platform2 {
	id: number;
	name: string;
	slug: string;
	image?: any;
	year_end?: any;
	year_start?: number;
	games_count: number;
	image_background: string;
}

interface RequirementsEn {
	minimum: string;
	recommended: string;
}

interface RequirementsRu {
	minimum: string;
	recommended: string;
}

interface Platform {
	platform: Platform2;
	released_at: string;
	requirements_en: RequirementsEn;
	requirements_ru: RequirementsRu;
}

interface Platform3 {
	id: number;
	name: string;
	slug: string;
}

 interface ParentPlatform {
	platform: Platform3;
}

 interface Genre {
	id: number;
	name: string;
	slug: string;
	games_count: number;
	image_background: string;
}

 interface Store2 {
	id: number;
	name: string;
	slug: string;
	domain: string;
	games_count: number;
	image_background: string;
}

 interface Store {
	id: number;
	store: Store2;
}

 interface Tag {
	id: number;
	name: string;
	slug: string;
	language: string;
	games_count: number;
	image_background: string;
}

 interface EsrbRating {
	id: number;
	name: string;
	slug: string;
}

 interface ShortScreenshot {
	id: number;
	image: string;
}

export interface Result {
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
	platforms: Platform[];
	parent_platforms: ParentPlatform[];
	genres: Genre[];
	stores: Store[];
	clip?: any;
	tags: Tag[];
	esrb_rating: EsrbRating;
	short_screenshots: ShortScreenshot[];
}

 interface Year2 {
	year: number;
	count: number;
	nofollow: boolean;
}

 interface Year {
	from: number;
	to: number;
	filter: string;
	decade: number;
	years: Year2[];
	nofollow: boolean;
	count: number;
}

 interface Filters {
	years: Year[];
}

export interface IGameList {
	count: number;
	next: string;
	previous?: any;
	results: Result[];
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
