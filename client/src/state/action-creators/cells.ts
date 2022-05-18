import { Dispatch } from 'redux';
import { randomId } from '../helpers';
import axios from 'axios';
import { Cell, CellUpdate, CellTypes, SavedCell, Id } from '../models';
import { CellActionType, TabActionType } from '../action-types';
import { editorLangs } from '../../components/Code-Editor/code-editor';
import { UpdateActiveTabAction, CreateTabAction } from '../actions/tabsActions';
import {
	CreateCellAction,
	LoadCellAction,
	MoveCellAction,
	UpdateCellAction,
	DeleteCellAction,
	ResetCellsAction,
	CellDirection,
} from '../actions/cellsActions';
import { SetErrorAction } from '../actions';
import { setError } from './pages';

type NewCellDispatch =
	| CreateCellAction
	| CreateTabAction
	| UpdateActiveTabAction;

export const createCell = (page_id: Id, cell_type: CellTypes) => {
	return (dispatch: Dispatch<NewCellDispatch>) => {
		const cell_id = randomId();
		dispatch({
			type: CellActionType.CREATE_CELL,
			payload: {
				id: cell_id,
				page_id,
				cell_type,
			},
		});

		if (cell_type === 'code') {
			for (const lang of editorLangs) {
				dispatch({
					type: TabActionType.CREATE_TAB,
					payload: {
						cell_id,
						code_language: lang,
					},
				});
			}
		}
	};
};

export const loadCell = (data: SavedCell): LoadCellAction => {
	return {
		type: CellActionType.LOAD_CELL,
		payload: data,
	};
};

export const moveCell = (id: Id, direction: CellDirection): MoveCellAction => {
	return {
		type: CellActionType.MOVE_CELL,
		payload: {
			id,
			direction,
		},
	};
};

export const updateCell = (
	id: Id,
	data: CellUpdate
): UpdateCellAction | void => {
	return {
		type: CellActionType.UPDATE_CELL,
		payload: {
			id,
			data,
		},
	};
};

export const deleteCell = (cell: Cell) => {
	return async (dispatch: Dispatch<DeleteCellAction | SetErrorAction>) => {
		try {
			dispatch({
				type: CellActionType.DELETE_CELL,
				payload: { id: cell.id },
			});
			if (typeof cell.id === 'number') {
				await axios.delete(`/api/cells/${cell.id}`);
			}
		} catch (err: any) {
			dispatch(setError(err.response.data.error.messages));
		}
	};
};

export const resetCells = (): ResetCellsAction => {
	return {
		type: CellActionType.RESET_CELLS,
		payload: {},
	};
};
