import produce from 'immer';
import { CellAction } from '../actions';
import { CellActionType } from '../action-types';
import { randomId } from '../helpers';
import { Cell, SavedCell, Id, TempCell } from '../models';

export interface CellsState {
	order: Id[];
	data: {
		[key: Id]: Cell;
	};
}

const initialCellsState: CellsState = {
	order: [],
	data: {},
};

const reducer = produce(
	(state: CellsState = initialCellsState, action: CellAction): CellsState => {
		switch (action.type) {
			// CREATE
			case CellActionType.CREATE_CELL: {
				const { page_id, cell_type } = action.payload;
				const id = randomId();
				state.order.push(id);
				const newCell: TempCell = {
					id,
					page_id,
					cell_type,
					content: null,
				};
				state.data[id] = newCell;
				return state;
			}

			// LOAD
			case CellActionType.LOAD_CELL: {
				const cell: SavedCell = { ...action.payload };
				state.order.push(cell.id);
				state.data[cell.id] = cell;
				return state;
			}

			// MOVE
			case CellActionType.MOVE_CELL: {
				const { id, direction } = action.payload;
				const index = state.order.indexOf(id);
				const targetIndex = direction === 'up' ? index - 1 : index + 1;
				if (targetIndex < 0 || targetIndex >= state.order.length) return state;
				state.order[index] = state.order[targetIndex];
				state.order[targetIndex] = id;
				return state;
			}

			// UPDATE
			case CellActionType.UPDATE_CELL: {
				const { id, data } = action.payload;
				state.data[id] = { ...state.data[id], ...(data as Cell) };
				return state;
			}

			// DELETE
			case CellActionType.DELETE_CELL: {
				const { id } = action.payload;
				state.order = state.order.filter((cell_id) => cell_id !== id);
				delete state.data[id];
				return state;
			}

			// RESET
			case CellActionType.RESET_CELLS:
				state = initialCellsState;
				return state;

			default:
				return state;
		}
	},
	initialCellsState
);

export default reducer;
