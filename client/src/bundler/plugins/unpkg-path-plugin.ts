import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			// Handle root entry file of 'index.js'
			build.onResolve({ filter: /(^index\.js$)/ }, () => {
				return { namespace: 'index', path: 'index.js' };
			});
			// Handle root entry file of 'index.css'
			build.onResolve({ filter: /(^index\.css$)/ }, () => {
				return { namespace: 'index', path: 'index.css' };
			});

			// Handle relative path in a module
			build.onResolve({ filter: /^\.+\// }, (args: any) => {
				return {
					namespace: 'a',
					path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
						.href,
				};
			});

			// Handle main file of a module
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: 'a',
					path: 'https://unpkg.com/' + args.path,
				};
			});
		},
	};
};
