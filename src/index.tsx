import 'bulmaswatch/superhero/bulmaswatch.min.css';

import * as esbuild from 'esbuild-wasm';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import { CodeEditor } from './components/CodeEditor';

const App = () => {
	const [input, setInput] = useState('');
	const iframe = useRef<any>();

	const startService = async () => {
		try {
			await esbuild.initialize({
				worker: true,
				wasmURL: 'https://unpkg.com/esbuild-wasm@0.13.8/esbuild.wasm',
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		startService();
	}, []);

	const onClick = async () => {
		iframe.current.srcdoc = html;
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

			iframe.current.contentWindow.postMessage(res.outputFiles[0].text, '*');
		} catch (err) {
			console.error(err);
		}
	};

	const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

	return (
		<div>
			<CodeEditor input={input} onChange={(val) => setInput(val)} />
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<iframe title='preview' ref={iframe} sandbox='allow-scripts' srcDoc={html} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
