import { SavedCell } from './cell';
import { SavedTab } from './tab';

export type Id = string | number;

export interface TempPage {
	id: string;
	page_name: string;
	user_id?: number;
	author?: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface SavedPage {
	id: number;
	page_name: string;
	user_id: number;
	author: string;
	created_at: Date;
	updated_at: Date;
}

export interface FullPage {
	page: SavedPage;
	cells: SavedCell[];
	tabs: SavedTab[];
}

export type Page = TempPage | SavedPage;
