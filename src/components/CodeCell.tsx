import bundle from '../bundler';

import { useState } from 'react';
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
		<div>
			<CodeEditor input={input} onChange={(val) => setInput(val)} />
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<Preview code={code} />
		</div>
	);
};

export default CodeCell;
