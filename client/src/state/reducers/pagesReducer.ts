import produce from 'immer';
import { PagesActionType } from '../action-types';
import { PagesAction } from '../actions';
import { randomId } from '../helpers';
import { Page, Id } from '../models';

interface PagesState {
	loading: boolean;
	error: string | null;
	recent: number[];
	current: {
		id: Id;
		saved: boolean;
	};
	data: {
		[key: Id]: Page;
	};
}

const initialPage: Page = {
	id: randomId(),
	page_name: 'Untitled',
};

const initialPagesState: PagesState = {
	loading: false,
	error: null,
	recent: [],
	current: {
		id: initialPage.id,
		saved: true,
	},
	data: {
		[initialPage.id]: initialPage,
	},
};

const reducer = produce(
	(state: PagesState = initialPagesState, action: PagesAction): PagesState => {
		switch (action.type) {
			case PagesActionType.SET_PAGE_LOADING:
				state.loading = true;
				return state;

			case PagesActionType.CREATE_PAGE:
				const id = randomId();
				const newPage = { id, page_name: 'Untitled' };
				state.loading = false;
				state.error = null;
				state.current.id = newPage.id;
				state.current.saved = true;
				state.data[newPage.id] = newPage;
				return state;

			case PagesActionType.SET_CURRENT_PAGE:
				state.loading = false;
				state.error = null;
				state.current.id = action.payload.id;
				return state;

			case PagesActionType.LOAD_SAVED_PAGE:
				state.loading = false;
				state.error = null;
				state.data[action.payload.page.id] = action.payload.page;
				state.current.id = action.payload.page.id;
				return state;

			case PagesActionType.LOAD_SAVED_PAGES:
				state.loading = false;
				state.error = null;
				action.payload.pages.forEach((page) => {
					state.data[page.id] = page;
				});
				return state;

			case PagesActionType.UPDATE_PAGE_NAME:
				state.loading = false;
				state.data[state.current.id].page_name = action.payload.page_name;
				state.current.saved = false;
				return state;

			case PagesActionType.UPDATE_SAVED_STATUS:
				state.loading = false;
				state.current.saved = action.payload.saved;
				return state;

			case PagesActionType.DELETE_PAGE:
				state.loading = false;
				delete state.data[action.payload.id];
				return state;

			case PagesActionType.ADD_RECENT_PAGE:
				state.recent = state.recent.filter((id) => id !== action.payload.id);
				state.recent.push(action.payload.id);
				return state;

			case PagesActionType.REMOVE_RECENT_PAGE:
				state.recent = state.recent.filter((id) => id !== action.payload.id);
				return state;

			case PagesActionType.SET_ERROR:
				state.loading = false;
				state.error = action.payload.error;
				return state;

			case PagesActionType.CLEAR_ERROR:
				state.error = null;
				return state;

			default:
				return state;
		}
	},
	initialPagesState
);

export default reducer;
