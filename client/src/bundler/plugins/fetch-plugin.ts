import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
	name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
	return {
		name: 'fetch-plugin',
		setup(build: esbuild.PluginBuild) {
			build.onLoad({ filter: /(^index\.js$)/ }, () => {
				return {
					loader: 'jsx',
					contents: inputCode,
				};
			});

			build.onLoad({ filter: /(^index\.css$)/ }, () => {
				return {
					loader: 'css',
					contents: inputCode,
				};
			});

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
					args.path
				);
				if (cachedResult) return cachedResult;
				return null;
			});

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path, {
					withCredentials: false,
				});
				const loader = request.responseURL.match(/.css$/) ? 'css' : 'jsx';
				const result: esbuild.OnLoadResult = {
					loader,
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname,
				};
				await fileCache.setItem(args.path, result);
				return result;
			});

			// build.onLoad({ filter: /.css$/ }, async (args: any) => {
			// 	console.log('onload: .css');
			// 	const { data, request } = await axios.get(args.path);
			// 	const contents = `
			//   const styles = document.createElement('style');
			//   styles.innerText = \`${data}\';
			//   document.head.appendChild(styles);
			// `;

			// 	const result: esbuild.OnLoadResult = {
			// 		loader: 'jsx',
			// 		contents,
			// 		resolveDir: new URL('./', request.responseURL).pathname,
			// 	};
			// 	await fileCache.setItem(args.path, result);
			// 	return result;
			// });
		},
	};
};
