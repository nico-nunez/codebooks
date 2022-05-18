import produce from 'immer';
import { Id } from '../models';
import { BundleAction } from '../actions';
import { BundleActionType } from '../action-types';
import { EditorLanguages } from '../../components/Code-Editor/code-editor';

export type CodeBundle = {
	loading: boolean;
	error: string;
	warning: string;
	code: {
		[key in EditorLanguages]?: string;
	};
};

export type BundleState = {
	[key: Id]: CodeBundle;
};

const initialState: BundleState = {};

const reducer = produce(
	(state: BundleState = initialState, action: BundleAction): BundleState => {
		switch (action.type) {
			case BundleActionType.BUNDLE_START: {
				const { cell_id, code_language } = action.payload;
				if (!state[cell_id]) state[cell_id] = {} as CodeBundle;
				state[cell_id].loading = true;
				state[cell_id].error = '';
				state[cell_id].warning = '';
				state[cell_id].code = state[cell_id].code || {};
				state[cell_id].code[code_language] = '';

				return state;
			}
			case BundleActionType.BUNDLE_COMPLETE: {
				const { cell_id, code_language, bundle } = action.payload;
				state[cell_id].loading = false;
				state[cell_id].error = bundle.error;
				state[cell_id].warning = bundle.warning;
				state[cell_id].code[code_language] = bundle.code;
				return state;
			}

			case BundleActionType.RESET_BUNDLES: {
				state = initialState;
				return state;
			}
			default:
				return state;
		}
	},
	initialState
);

export default reducer;
