import { Id } from '../models';
import { BundleActionType } from '../action-types';
import { EditorLanguages } from '../../components/Code-Editor/code-editor';

export interface BundleStartAction {
	type: BundleActionType.BUNDLE_START;
	payload: {
		cell_id: Id;
		code_language: EditorLanguages;
	};
}

export interface BundleCompleteAction {
	type: BundleActionType.BUNDLE_COMPLETE;
	payload: {
		cell_id: Id;
		code_language: EditorLanguages;
		bundle: {
			code: string;
			error: string;
			warning: string;
		};
	};
}

export interface ResetBundlesAction {
	type: BundleActionType.RESET_BUNDLES;
	payload: {};
}

export type BundleAction =
	| BundleStartAction
	| BundleCompleteAction
	| ResetBundlesAction;
