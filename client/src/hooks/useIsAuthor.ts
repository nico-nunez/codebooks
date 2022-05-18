import { useTypedSelector } from './useTypeSelector';

export const useIsAuthor = () => {
	const currentUserId = useTypedSelector(({ auth }) => auth.user?.id);
	const authorId = useTypedSelector(
		({ pages }) => pages.data[pages.current.id].user_id
	);
	if (!currentUserId) return false;
	return currentUserId === authorId;
};
