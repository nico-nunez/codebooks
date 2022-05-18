import { Page } from '../state';
import { useTypedSelector } from './useTypeSelector';

export const useCurrentPage = (): Page => {
	const page = useTypedSelector(({ pages }) => {
		return pages.data[pages.current.id];
	});
	return page || {};
};
