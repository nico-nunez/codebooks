import { EditorLanguages } from '../../components/Code-Editor/code-editor';
import { TabActionType } from '../action-types';
import { SavedTab, Id } from '../models';

export type TabDirection = 'left' | 'right';

export interface CreateTabAction {
	type: TabActionType.CREATE_TAB;
	payload: {
		cell_id: Id;
		code_language: EditorLanguages;
	};
}

export interface LoadTabAction {
	type: TabActionType.LOAD_TAB;
	payload: SavedTab;
}

export interface MoveTabAction {
	type: TabActionType.MOVE_TAB;
	payload: {
		id: Id;
		direction: TabDirection;
	};
}

export interface UpdateTabAction {
	type: TabActionType.UPDATE_TAB;
	payload: {
		id: Id;
		content: string;
	};
}

export interface DeleteTabAction {
	type: TabActionType.DELETE_TAB;
	payload: {
		id: Id;
	};
}

export interface UpdateActiveTabAction {
	type: TabActionType.UPDATE_ACTIVE_TAB;
	payload: {
		tab_id: Id | null;
	};
}

export interface ResetTabsAction {
	type: TabActionType.RESET_TABS;
	payload: {};
}

export type TabAction =
	| CreateTabAction
	| LoadTabAction
	| MoveTabAction
	| UpdateTabAction
	| UpdateActiveTabAction
	| DeleteTabAction
	| ResetTabsAction;
