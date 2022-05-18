import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { useTypedSelector } from './useTypeSelector';

export const useBlockNav = () => {
	const navigate = useNavigate();
	const [path, setPath] = useState<string>('/');
	const [callback, setCallback] = useState<() => void>();
	const [showBlockModal, setShowBlockModal] = useState<boolean>(false);
	const isSaved = useTypedSelector(({ pages: { current } }) => current.saved);
	const toggleBlockModal = useCallback((newState) => {
		if (newState !== undefined) {
			setShowBlockModal(newState);
		} else {
			setShowBlockModal((state) => !state);
		}
	}, []);
	const blockNav = useCallback(
		(
			e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | null,
			func?: () => () => void
		) => {
			if (func) setCallback(func);
			const navPath = e?.currentTarget.pathname || path;
			setPath(navPath);
			if (e) {
				e.preventDefault();
				if (!isSaved) {
					setShowBlockModal(true);
					return;
				}
			}
			if (func) func()();
			if (callback) callback();
			setShowBlockModal(false);
			navigate(navPath);
		},
		[isSaved, path, callback, navigate]
	);
	return { blockNav, path, showBlockModal, toggleBlockModal };
};
