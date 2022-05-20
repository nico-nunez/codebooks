import { AuthActionType } from '../action-types';
import { User } from '../models';

export interface RegisterUserAction {
	type: AuthActionType.REGISTER_USER;
	payload: {
		email: string;
		password: string;
		confirmPass: string;
		profile_name: string;
	};
}

export interface AuthSuccessAction {
	type: AuthActionType.AUTH_SUCCESS;
	payload: {
		user: User;
	};
}

export interface AuthFailureAction {
	type: AuthActionType.AUTH_FAILURE;
	payload: {
		errors: string[] | null;
	};
}

export interface AuthenticateSessionAction {
	type: AuthActionType.AUTHENTICATE_SESSION;
	payload: {};
}

export interface AuthClearErrorsAction {
	type: AuthActionType.AUTH_CLEAR_ERRORS;
	payload: {};
}

export type AuthAction =
	| RegisterUserAction
	| AuthSuccessAction
	| AuthFailureAction
	| AuthClearErrorsAction;
