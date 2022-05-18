import { useActions } from './useActions';
import { useCurrentPage } from './useCurrentPage';

export const useNewPage = (): (() => void) => {
	const { deletePage, createPage, resetCells, resetTabs, resetBundles } =
		useActions();
	const page = useCurrentPage();
	return () => {
		if (!page.user_id) deletePage(page.id);
		createPage();
		resetCells();
		resetTabs();
		resetBundles();
	};
};
