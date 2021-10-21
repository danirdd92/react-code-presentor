import * as esbuild from 'esbuild-wasm';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

let isInitialized = false;
// eslint-disable-next-line import/no-anonymous-default-export
export default async (code: string) => {
	try {
		if (!isInitialized) {
			await esbuild.initialize({
				worker: true,
				wasmURL: 'https://unpkg.com/esbuild-wasm@0.13.8/esbuild.wasm',
			});
			isInitialized = true;
		}

		const res = await esbuild.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(code)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		});

		return res.outputFiles[0].text;
	} catch (err) {
		console.log(err);
	}
};
