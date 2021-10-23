import bundle from '../bundler';
import { useState, useEffect } from 'react';
import Resizable from './Resizable';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { content, id } = cell;
	const { updateCell } = useActions();
	const [code, setCode] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		const timer = setTimeout(async () => {
			const res = await bundle(content);
			setCode(res.code || '');
			setError(res.err);
		}, 800);
		return () => {
			clearTimeout(timer);
		};
	}, [content]);

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction='horizontal'>
					<CodeEditor input={content} onChange={(val) => updateCell(id, val)} />
				</Resizable>
				<Preview code={code} errorDetails={error} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
