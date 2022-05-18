import { useEffect, useRef, useState } from 'react';
import { useActions } from '../../hooks';

interface PageNameProps {
	page_name: string;
}

export const PageName: React.FC<PageNameProps> = ({ page_name }) => {
	const nameRef = useRef<HTMLSpanElement | null>(null);
	const [editing, setEditing] = useState(false);
	const { updatePageName } = useActions();
	const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
		updatePageName(evt.target.value);
	};
	useEffect(() => {
		const handleClick = (evt: MouseEvent) => {
			if (
				nameRef.current &&
				evt.target &&
				nameRef.current.contains(evt.target as Node)
			) {
				return;
			}
			setEditing(false);
		};
		document.addEventListener('click', handleClick, { capture: true });
		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, []);

	if (!page_name && !editing) setEditing(true);
	if (editing) {
		return (
			<div className="page-name">
				<span ref={nameRef}>
					<input
						className="input is-medium has-text-centered"
						value={page_name}
						onChange={onChangeName}
					/>
				</span>
			</div>
		);
	}
	return (
		<div className="page-name">
			<span className="is-size-4 ml-6">{page_name}</span>
			<i
				className={`fa-solid fa-${!editing && 'pencil'}`}
				onClick={() => setEditing(true)}
			></i>
		</div>
	);
};

export default PageName;
