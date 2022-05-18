import './Text-Cell.css';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../../state';
import { useEffect, useRef, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import TextCellActionBar from './Text-Cell-Action-Bar';

interface TextCellProps {
	cell: Cell;
}

const TextCell: React.FC<TextCellProps> = ({ cell: { content, id } }) => {
	const editorRef = useRef<HTMLDivElement | null>(null);
	const [editing, setEditing] = useState(false);
	const { updateCell, updateSavedStatus } = useActions();

	const onChange = (val: string = '') => {
		updateCell(id, { content: val });
		updateSavedStatus(false);
	};

	useEffect(() => {
		const handleClick = (evt: MouseEvent) => {
			if (
				editorRef.current &&
				evt.target &&
				editorRef.current.contains(evt.target as Node)
			) {
				return;
			}
			setEditing(false);
		};
		document.addEventListener('click', handleClick, { capture: true });
		return () => {
			document.removeEventListener('click', handleClick, { capture: true });
		};
	}, []);

	if (editing) {
		return (
			<div ref={editorRef} className="text-editor">
				<MDEditor value={content || ''} onChange={onChange} />
			</div>
		);
	}

	return (
		<>
			<TextCellActionBar id={id} />
			<div onClick={() => setEditing(true)} className="text-editor card">
				<div className="card-content">
					<MDEditor.Markdown source={content || 'Click to edit'} />
				</div>
			</div>
		</>
	);
};
export default TextCell;
