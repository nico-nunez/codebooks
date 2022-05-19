import { store } from '../store';
import { Dispatch } from 'redux';
import bundle from '../../bundler';
import { resetBundles } from './bundles';
import { loadTab, resetTabs } from './tabs';
import axios, { AxiosResponse } from 'axios';
import { loadCell, resetCells } from './cells';
import { NavigateFunction } from 'react-router-dom';
import { TabAction } from '../actions/tabsActions';
import { CellAction } from '../actions/cellsActions';
import { FullPage, SavedPage, Id } from '../models';
import { BundleAction } from '../actions/bundleActions';
import { PagesActionType, BundleActionType } from '../action-types';
import {
	SetPageLoadingAction,
	CreatePageAction,
	LoadSavedPageAction,
	LoadSavedPagesAction,
	UpdatePageNameAction,
	UpdateSavedStatusAction,
	DeletePageAction,
	SetCurrentPageAction,
	AddRecentPageAction,
	RemoveRecentPageAction,
	SetErrorAction,
	ClearErrorAction,
	PagesAction,
} from '../actions/pagesActions';

type FullPageAction = PagesAction | CellAction | TabAction | BundleAction;
type Pagination = { page: number; limit: number };

export const setPageLoading = (): SetPageLoadingAction => {
	return {
		type: PagesActionType.SET_PAGE_LOADING,
		payload: {},
	};
};

export const createPage = (): CreatePageAction => {
	return {
		type: PagesActionType.CREATE_PAGE,
		payload: {},
	};
};

export const setCurrentPage = (id: Id): SetCurrentPageAction => {
	return {
		type: PagesActionType.SET_CURRENT_PAGE,
		payload: {
			id,
		},
	};
};

type SavedPageAction = PagesAction | CellAction | TabAction | BundleAction;

export const savePage = (navigate: NavigateFunction) => {
	return async (dispatch: Dispatch<SavedPageAction>) => {
		dispatch(setPageLoading());
		try {
			const { pages, cells, tabs } = store.getState();
			const pageData = pages.data[pages.current.id];
			const cellsData = cells.order.map((id) => cells.data[id]);
			const tabsData = tabs.order.map((id) => tabs.data[id]);
			const combinedData = { page: pageData, cells: cellsData, tabs: tabsData };
			const { data }: AxiosResponse<FullPage> = await axios.put(
				`/api/pages/${combinedData.page.id}`,
				combinedData
			);
			loadFullPage(dispatch, data);
			if (typeof pageData.id === 'string') navigate(`/pages/${data.page.id}`);
		} catch (err: any) {
			dispatch(setError(err.response.data.error.messages));
		}
	};
};

// LOAD FULL PAGE (CELLS & TABS)
export const fetchFullPage = (
	id: number | null,
	navigate: NavigateFunction
) => {
	return async (dispatch: Dispatch<FullPageAction>) => {
		try {
			dispatch(setPageLoading());
			const { data }: AxiosResponse<FullPage> = await axios.get(
				`/api/pages/${id}`
			);
			loadFullPage(dispatch, data);
		} catch (err: any) {
			dispatch(setError(err.response.data.error.messages));
			navigate('/');
		}
	};
};

// LOAD SAVED PAGE (PAGE ONLY)
export const loadSavedPage = (page: SavedPage): LoadSavedPageAction => {
	return {
		type: PagesActionType.LOAD_SAVED_PAGE,
		payload: { page },
	};
};

type FetchOptions = { page?: number; limit?: number };
const defaultFetchOptions: FetchOptions = {
	page: 1,
	limit: 10,
};

// FETCH AND LOAD PAGES (PAGES ONLY)
export const fetchPages = (options: FetchOptions = defaultFetchOptions) => {
	const { page, limit } = options;
	return async (dispatch: Dispatch<PagesAction>) => {
		try {
			dispatch(setPageLoading());
			const { data }: AxiosResponse<SavedPage[]> = await axios.get(
				'/api/pages',
				{
					params: {
						page,
						limit,
					},
				}
			);
			dispatch(loadSavedPages(data));
		} catch (err: any) {
			dispatch(setError(err.response.data.error.messages));
		}
	};
};

// LOAD SAVED PAGE (SINGLE)
export const loadSavedPages = (pages: SavedPage[]): LoadSavedPagesAction => {
	return {
		type: PagesActionType.LOAD_SAVED_PAGES,
		payload: {
			pages,
		},
	};
};

type FetchedPages = {
	pages: SavedPage[];
	pagination: Pagination;
};

// FETCH AND LOAD USER'S PAGES
export const fetchUserPages = (
	userId: number,
	options: FetchOptions = defaultFetchOptions
) => {
	return async (dispatch: Dispatch<PagesAction>) => {
		const { page, limit } = options;
		try {
			dispatch(setPageLoading());
			const { data }: AxiosResponse<FetchedPages> = await axios.get(
				`/api/users/${userId}/pages`,
				{
					params: {
						page,
						limit,
					},
				}
			);
			dispatch(loadSavedPages(data.pages));
		} catch (err: any) {
			console.log(err);
			dispatch(setError(err.response.data.error.messages));
		}
	};
};

// UPDATE PAGE NAME
export const updatePageName = (page_name: string): UpdatePageNameAction => {
	return {
		type: PagesActionType.UPDATE_PAGE_NAME,
		payload: {
			page_name,
		},
	};
};

// UPDATE SAVED CHANGES
export const updateSavedStatus = (saved: boolean): UpdateSavedStatusAction => {
	return {
		type: PagesActionType.UPDATE_SAVED_STATUS,
		payload: {
			saved,
		},
	};
};

// DELETE CURRENT PAGE
export const deletePage = (id: Id): DeletePageAction => {
	return {
		type: PagesActionType.DELETE_PAGE,
		payload: {
			id,
		},
	};
};

// DELETE SAVED PAGE
export const deleteSavedPage = (id: number, navigate?: NavigateFunction) => {
	return async (dispatch: Dispatch<FullPageAction>) => {
		try {
			dispatch(setPageLoading());
			await axios.delete(`/api/pages/${id}`);
			dispatch(deletePage(id));
			dispatch(createPage());
			dispatch(resetCells());
			dispatch(resetTabs());
			dispatch(resetBundles());
			if (navigate) navigate('/');
		} catch (err: any) {
			dispatch(setError(err.response.data.error.messages));
		}
	};
};

// ADD RECENT
export const addRecent = (id: number): AddRecentPageAction => {
	return {
		type: PagesActionType.ADD_RECENT_PAGE,
		payload: { id },
	};
};

// REMOVE RECENT
export const removeRecent = (id: number): RemoveRecentPageAction => {
	return {
		type: PagesActionType.REMOVE_RECENT_PAGE,
		payload: { id },
	};
};

// SET ERROR
export const setError = (error: string): SetErrorAction => {
	return {
		type: PagesActionType.SET_ERROR,
		payload: {
			error,
		},
	};
};

// CLEAR ERROR
export const clearError = (): ClearErrorAction => {
	return {
		type: PagesActionType.CLEAR_ERROR,
		payload: {},
	};
};

// LOAD FULL PAGE HELPER
const loadFullPage = async (
	dispatch: Dispatch<FullPageAction>,
	data: FullPage
) => {
	dispatch(loadSavedPage(data.page));
	dispatch(resetCells());
	dispatch(resetTabs());
	for (const cell of data.cells) {
		dispatch(loadCell(cell));
	}
	for (const tab of data.tabs) {
		dispatch(loadTab(tab));
	}
	const { tabs, bundles } = store.getState();
	const cell_id = tabs.data[tabs.order[0]].cell_id;
	if (tabs.order.length && !bundles[cell_id]) {
		dispatch(resetBundles());
		for (const id of tabs.order) {
			const { cell_id, code_language, content } = tabs.data[id];
			dispatch({
				type: BundleActionType.BUNDLE_START,
				payload: {
					cell_id,
					code_language,
				},
			});
			const result = await bundle(content || '', code_language);
			dispatch({
				type: BundleActionType.BUNDLE_COMPLETE,
				payload: {
					cell_id,
					code_language,
					bundle: result,
				},
			});
		}
	}
	dispatch(updateSavedStatus(true));
};
