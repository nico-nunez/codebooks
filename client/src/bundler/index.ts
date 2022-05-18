import * as esbuild from 'esbuild-wasm';
import { EditorLanguages } from '../components/Code-Editor/code-editor';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

let initialized: boolean;

const bundler = async (rawCode: string, lang: EditorLanguages) => {
	if (lang === 'html') return { code: rawCode, error: '', warning: '' };
	const entryPoint = {
		javascript: ['index.js'],
		css: ['index.css'],
		html: ['index.html]'],
	};

	try {
		await esbuild.build({});
		initialized = true;
	} catch (error) {
		initialized = false;
	}

	if (!initialized) {
		await esbuild.initialize({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.38/esbuild.wasm',
		});
		initialized = true;
	}

	try {
		const result = await esbuild.build({
			entryPoints: entryPoint[lang],
			bundle: true,
			minify: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		});
		const warning = result.warnings.length ? result.warnings[0].text : '';
		const error = result.errors.length ? result.errors[0].text : '';
		return {
			code: result.outputFiles[0].text,
			warning,
			error,
		};
	} catch (err: any) {
		return { code: '', error: err.message, warning: '' };
	}
};

export default bundler;
