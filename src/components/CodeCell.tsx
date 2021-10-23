import './styles/code-cell.css';

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
		if (!bundle) {
			createBundle(id, content);
			return;
		}
		const timer = setTimeout(async () => {
			createBundle(id, content);
		}, 750);
		return () => {
			clearTimeout(timer);
		};
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [content, id, createBundle]);

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction='horizontal'>
					<CodeEditor input={content} onChange={(val) => updateCell(id, val)} />
				</Resizable>
				<div className='progress-wrapper'>
					{!bundle || bundle.loading ? (
						<div className='progress-cover'>
							<progress className='progress is-small is-primary' max='100'>
								Loading
							</progress>
						</div>
					) : (
						<Preview code={bundle.code} errorDetails={bundle.err} />
					)}
				</div>
			</div>
		</Resizable>
	);
};

export default CodeCell;
