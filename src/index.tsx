import * as esbuild from 'esbuild-wasm';
import { useEffect, useState } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import ReactDOM from 'react-dom';

const App = () => {
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');

	const startService = async () => {
		try {
			await esbuild.initialize({
				worker: true,
				wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		startService();
	}, []);

	const onClick = async () => {
		try {
			const res = await esbuild.build({
				entryPoints: ['index.js'],
				bundle: true,
				write: false,
				plugins: [unpkgPathPlugin(), fetchPlugin(input)],
				define: {
					'process.env.NODE_ENV': '"production"',
					global: 'window',
				},
			});
			setCode(res.outputFiles[0].text);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<textarea value={input} onChange={(e) => setInput(e.target.value)}>
				{input}
			</textarea>

			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<pre>{code}</pre>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
