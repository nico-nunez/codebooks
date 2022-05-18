import produce from 'immer';
import { TabAction } from '../actions';
import { TabActionType } from '../action-types';
import { SavedTab, Tab, Id } from '../models';
import { randomId } from '../helpers';

export interface TabsState {
	order: Id[];
	active: Id | null;
	data: {
		[key: Id]: Tab;
	};
}

export const initialTabsState: TabsState = {
	order: [],
	active: null,
	data: {},
};

const reducer = produce(
	(state: TabsState = initialTabsState, action: TabAction): TabsState => {
		switch (action.type) {
			// CREATE
			case TabActionType.CREATE_TAB: {
				const { cell_id, code_language } = action.payload;
				let content = '';
				if (code_language === 'javascript') {
					content = `// Import js files from unpkg.com:
      // import React from 'react';`;
				}
				if (code_language === 'css') {
					content = `/* Import css files from unpkg.com: */
      /* @import 'bulma'; */`;
				}
				const newTab: Tab = {
					id: randomId(),
					code_language,
					content,
					cell_id,
				};
				state.active = state.active || newTab.id;
				state.order.push(newTab.id);
				state.data[newTab.id] = newTab;
				return state;
			}

			// LOAD
			case TabActionType.LOAD_TAB: {
				const tab: SavedTab = { ...action.payload };
				state.order.push(tab.id);
				state.data[tab.id] = tab;
				return state;
			}

			// MOVE
			case TabActionType.MOVE_TAB: {
				const { id, direction } = action.payload;
				const index = state.order.indexOf(id);
				const targetIndex = direction === 'left' ? index - 1 : index + 1;
				if (targetIndex < 0 || targetIndex >= state.order.length) {
					return state;
				}
				state.order[index] = state.order[targetIndex];
				state.order[targetIndex] = id;
				return state;
			}

			// UPDATE
			case TabActionType.UPDATE_TAB: {
				const { id, content } = action.payload;
				state.data[id].content = content || '';
				return state;
			}

			// ACTIVE TAB
			case TabActionType.UPDATE_ACTIVE_TAB: {
				const { tab_id } = action.payload;
				state.active = tab_id || state.order[0];
				return state;
			}

			// DELETE
			case TabActionType.DELETE_TAB: {
				const { id } = action.payload;
				state.order = state.order.filter((tab_id) => tab_id !== id);
				delete state.data[id];
				return state;
			}

			// RESET
			case TabActionType.RESET_TABS:
				state = initialTabsState;
				return state;

			default:
				return state;
		}
	},
	initialTabsState
);
export default reducer;
