import { useState, useCallback } from 'react';

type Toggler = [state: boolean, toggle: (newState?: boolean) => void];

export const useToggle = (initialState = false): Toggler => {
	const [state, setState] = useState(initialState);
	const toggle = useCallback((newState) => {
		if (newState !== undefined) {
			setState(newState);
		} else {
			setState((state) => !state);
		}
	}, []);
	return [state, toggle];
};
