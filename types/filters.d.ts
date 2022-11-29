import {
	GenresName,
	GenresSlug,
	StoreName,
	StoreSlug,
	TagName,
	TagSlug,
} from "./api";

export type FilterGenres = {
	id: number;
	name: GenresName;
	slug: GenresSlug;
};

export type FilterTags = {
	id: number;
	name: TagName;
	slug: TagSlug;
};

export type FilterStores = {
	id: number;
	name: StoreName;
	slug: StoreSlug;
};
