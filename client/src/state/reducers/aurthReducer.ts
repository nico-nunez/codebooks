import produce from 'immer';
import { User } from '../models/user';
import { AuthAction } from '../actions';
import { AuthActionType } from '../action-types';

interface AuthState {
	isAuthenticated: boolean;
	loading: boolean;
	user: User | null;
	errors: string[] | null;
}

const initialAuthState: AuthState = {
	isAuthenticated: false,
	loading: true,
	user: null,
	errors: null,
};

const reducer = produce(
	(state: AuthState = initialAuthState, action: AuthAction): AuthState => {
		switch (action.type) {
			case AuthActionType.AUTH_SUCCESS:
				state.isAuthenticated = true;
				state.loading = false;
				state.user = action.payload.user;
				state.errors = null;
				return state;

			case AuthActionType.AUTH_FAILURE:
				state.isAuthenticated = false;
				state.loading = false;
				state.user = null;
				state.errors = action.payload.errors;
				return state;

			default:
				return state;
		}
	},
	initialAuthState
);

export default reducer;
