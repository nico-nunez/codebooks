import { Id } from './page';
import { EditorLanguages } from '../../components/Code-Editor/code-editor';

interface BaseTab {
	code_language: EditorLanguages;
	content: string | null;
}

export interface TempTab extends BaseTab {
	id: string;
	cell_id: Id;
}

export interface SavedTab extends BaseTab {
	id: number;
	cell_id: number;
	created_at: Date;
	updated_at: Date;
}

export type Tab = TempTab | SavedTab;

export const initialContent = {
	javascript: `// Auto import npm packages:
  import React from 'react'; 
  import { render } from 'react-dom';
  // Supports js/jsx:
  const root = document.querySelector('#root');
  const App = () => <h1>Hello!</h1>;
  render(<App/>, root);
  `,

	html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
  <h1>Hello World!</h1>
  </body>
</html>
`,

	css: '',
};

export interface SavedTab {
	id: number;
	cell_id: number;
	code_language: EditorLanguages;
	content: string | null;
	order_index: number;
	created_at: Date;
	updated_at: Date;
}
