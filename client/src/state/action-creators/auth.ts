import { Dispatch } from 'redux';
import { User } from '../models';
import axios, { AxiosResponse } from 'axios';
import { AuthActionType } from '../action-types';
import {
	AuthAction,
	AuthSuccessAction,
	AuthFailureAction,
} from '../actions/authActions';

interface Registration {
	profile_name: string;
	email: string;
	password: string;
	confirmPass: string;
}

interface UserLogin {
	email: string;
	password: string;
}

axios.defaults.withCredentials = true;

export const authSuccess = (user: User): AuthSuccessAction => {
	return {
		type: AuthActionType.AUTH_SUCCESS,
		payload: {
			user,
		},
	};
};

export const authFailure = (errors: string[] | null): AuthFailureAction => {
	return {
		type: AuthActionType.AUTH_FAILURE,
		payload: {
			errors,
		},
	};
};

export const registerUser = (userData: Registration) => {
	return async (dispatch: Dispatch<AuthAction>) => {
		try {
			const { data }: AxiosResponse<User> = await axios.post(
				'/api/auth/register',
				{
					...userData,
				}
			);
			dispatch(authSuccess(data));
		} catch (err: any) {
			dispatch(authFailure(err.response.data.error.messages));
		}
	};
};

export const loginUser = (loginData: UserLogin) => {
	return async (dispatch: Dispatch<AuthAction>) => {
		try {
			const { data }: AxiosResponse<User> = await axios.post(
				'/api/auth/login',
				{
					...loginData,
				}
			);
			dispatch(authSuccess(data));
		} catch (err: any) {
			dispatch(authFailure(err.response.data.error.messages));
		}
	};
};

export const authenticateSession = () => {
	return async (dispatch: Dispatch<AuthAction>) => {
		try {
			const { data }: AxiosResponse<User> = await axios.get(
				'/api/auth/authenticate_session'
			);
			if (data.profile_name) {
				dispatch(authSuccess(data));
			} else {
				dispatch(authFailure(null));
			}
		} catch (err: any) {
			dispatch(authFailure(err.response.data.error.messages));
		}
	};
};
