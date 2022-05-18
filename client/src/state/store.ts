import thunk from 'redux-thunk';
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({});

const savedState = () => {
	const savedState = localStorage.getItem('__store');
	localStorage.clear();
	return savedState ? JSON.parse(savedState) : {};
};

export const store = createStore(
	reducers,
	savedState(),
	composeEnhancers(applyMiddleware(thunk))
);
export type MyStore = typeof store;
