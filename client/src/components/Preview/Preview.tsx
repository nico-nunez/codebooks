import './preview.css';
import { useEffect, useRef } from 'react';
import { useSrcDoc } from '../../hooks';
import { EditorLanguages } from '../Code-Editor/code-editor';

interface PreviewProps {
	code: { [key in EditorLanguages]?: string };
	error: string | null;
}

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
	const iframeRef = useRef<any>();
	const srcDoc = useSrcDoc(code, error);
	const js = code.javascript || '';
	useEffect(() => {
		if (js) {
			setTimeout(() => {
				iframeRef.current.contentWindow.postMessage(js, '*');
			}, 100);
		}
	}, [js]);

	return (
		<div className="preview-wrapper">
			<iframe
				ref={iframeRef}
				srcDoc={srcDoc}
				sandbox="allow-scripts"
				title="display-results"
			></iframe>
		</div>
	);
};

export default Preview;
