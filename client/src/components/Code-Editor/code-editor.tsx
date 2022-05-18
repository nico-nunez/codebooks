import './code-editor.css';
import { useRef } from 'react';
import prettier from 'prettier';
import { editor } from 'monaco-editor';
import parserJS from 'prettier/parser-babel';
import parserHTML from 'prettier/parser-html';
import parserCSS from 'prettier/parser-postcss';
import { JSXTypes } from 'monaco-jsx-highlighter';
import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';

interface Parser {
	parser: string;
	plugins: any[];
}

interface Parsers {
	[key: string]: Parser;
}

export const editorLangs = ['html', 'css', 'javascript'] as const;
export type EditorLanguages = typeof editorLangs[number];

const defaultLang: EditorLanguages = 'html';

// Prettier formatting options
const parsers: Parsers = {
	javascript: { parser: 'babel', plugins: [parserJS, parserHTML] },
	html: { parser: 'html', plugins: [parserHTML] },
	css: { parser: 'css', plugins: [parserCSS] },
};

JSXTypes.JSXText.options.inlineClassName = require('./syntax.css');

export interface CodeEditorProps {
	initialValue: string;
	onInputChange(value: string): void;
	code_language?: EditorLanguages;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
	initialValue,
	onInputChange,
	code_language = defaultLang,
}) => {
	const editorRef = useRef<editor.IStandaloneCodeEditor>();

	const onEditorMount: OnMount = (editor, monaco) => {
		editorRef.current = editor;
	};

	const onEditorInputChange: OnChange = (value, evt) => {
		onInputChange(value || '');
	};

	const onFormatClick = () => {
		if (!editorRef.current) return;
		const unformatted = editorRef.current.getValue();
		const formatted = prettier
			.format(unformatted, {
				parser: parsers[code_language].parser,
				plugins: parsers[code_language].plugins,
				singleQuote: true,
			})
			.replace(/\n$/, '');
		editorRef.current.setValue(formatted);
	};

	return (
		<div className="editor-wrapper">
			<button className="button button-format is-small" onClick={onFormatClick}>
				Format
			</button>
			<MonacoEditor
				onMount={onEditorMount}
				onChange={onEditorInputChange}
				value={initialValue}
				height="100%"
				language={code_language}
				theme="vs-dark"
				options={{
					wordWrap: 'on',
					minimap: { enabled: false },
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true,
					tabSize: 2,
				}}
			/>
		</div>
	);
};

export default CodeEditor;
