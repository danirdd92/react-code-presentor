import bundle from '../bundler';
import { useState, useEffect } from 'react';
import Resizable from './Resizable';
import CodeEditor from './CodeEditor';
import Preview from './Preview';

const CodeCell = () => {
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		const timer = setTimeout(async () => {
			const res = await bundle(input);
			setCode(res.code || '');
			setError(res.err);
		}, 800);
		return () => {
			clearTimeout(timer);
		};
	}, [input]);

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction='horizontal'>
					<CodeEditor input={input} onChange={(val) => setInput(val)} />
				</Resizable>
				<Preview code={code} errorDetails={error} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
