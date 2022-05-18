import { Id } from './page';

export type CellTypes = 'code' | 'text';

export interface CellUpdate {
	id?: Id;
	page_id?: Id;
	order_index?: number;
	content?: string | null;
	created_at?: Date;
	updated_at?: Date;
}

interface BaseCell {
	cell_type: CellTypes;
	content: string | null;
}

export interface TempCell extends BaseCell {
	id: string;
	page_id?: Id;
	order_index?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface SavedCell extends BaseCell {
	id: number;
	page_id: number;
	order_index: number;
	created_at: Date;
	updated_at: Date;
}

export type Cell = TempCell | SavedCell;
