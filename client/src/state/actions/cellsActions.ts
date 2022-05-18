import { CellActionType } from '../action-types';
import { CellTypes, SavedCell, Id, CellUpdate } from '../models';

export type CellDirection = 'up' | 'down';

export interface CreateCellAction {
	type: CellActionType.CREATE_CELL;
	payload: {
		id?: string;
		page_id: Id;
		cell_type: CellTypes;
	};
}

export interface LoadCellAction {
	type: CellActionType.LOAD_CELL;
	payload: SavedCell;
}

export interface MoveCellAction {
	type: CellActionType.MOVE_CELL;
	payload: {
		id: Id;
		direction: CellDirection;
	};
}

export interface UpdateCellAction {
	type: CellActionType.UPDATE_CELL;
	payload: {
		id: Id;
		data: CellUpdate;
	};
}

export interface DeleteCellAction {
	type: CellActionType.DELETE_CELL;
	payload: {
		id: Id;
	};
}

export interface ResetCellsAction {
	type: CellActionType.RESET_CELLS;
	payload: {};
}

export type CellAction =
	| CreateCellAction
	| LoadCellAction
	| MoveCellAction
	| UpdateCellAction
	| DeleteCellAction
	| ResetCellsAction;
