import { useEffect } from 'react';
import Resizable from './Resizable';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { content, id } = cell;
	const { updateCell, createBundle } = useActions();
	const bundle = useTypedSelector((state) => state.bundles[id]);

	useEffect(() => {
		const timer = setTimeout(async () => {
			createBundle(id, content);
		}, 750);
		return () => {
			clearTimeout(timer);
		};
	}, [content, id, createBundle]);

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction='horizontal'>
					<CodeEditor input={content} onChange={(val) => updateCell(id, val)} />
				</Resizable>
				{bundle && <Preview code={bundle.code} errorDetails={bundle.err} />}
			</div>
		</Resizable>
	);
};

export default CodeCell;
