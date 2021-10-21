import bundle from '../bundler';
import { useState } from 'react';
import Resizable from './Resizable';
import CodeEditor from './CodeEditor';
import Preview from './Preview';

const CodeCell = () => {
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');

	const onClick = async () => {
		const res = await bundle(input);
		setCode(res || '');
	};

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction='horizontal'>
					<CodeEditor input={input} onChange={(val) => setInput(val)} />
				</Resizable>
				<Preview code={code} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
