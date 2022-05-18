import { combineReducers } from 'redux';
import pagesReducer from './pagesReducer';
import cellsReducer from './cellsReducer';
import tabsReducer from './tabsReducer';
import bundlesReducer from './bundlesReducer';
import authReducer from './aurthReducer';

const reducers = combineReducers({
	pages: pagesReducer,
	cells: cellsReducer,
	tabs: tabsReducer,
	bundles: bundlesReducer,
	auth: authReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
export * from './tabsReducer';
