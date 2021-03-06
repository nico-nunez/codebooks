import bundle from '../bundler';
import { store, TabsState } from '../state';
import { BundleState } from '../state/reducers/bundlesReducer';

export const BASE_URL = 'https://codebooks.net';
// export const BASE_URL = 'http://localhost:8080';

export const saveStore = () => {
	localStorage.setItem('__store', JSON.stringify(store.getState()));
};

export const restoreBundles = async (tabs: TabsState) => {
	const bundles: BundleState = {};
	const tabsArr = Object.values(tabs.data);
	tabsArr.forEach(async (tab) => {
		const { cell_id, code_language, content } = tab;
		const { code } = await bundle(content || '', code_language);
		if (bundles[cell_id]) {
			bundles[cell_id].code[code_language] = code;
		} else {
			bundles[cell_id] = {
				loading: false,
				error: '',
				warning: '',
				code: { [code_language]: code },
			};
		}
	});
	return bundles;
};

export * from './form-validation';
