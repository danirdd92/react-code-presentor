import './TextEditor.css';

import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';

const TextEditor: React.FC = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [text, setText] = useState<string | undefined>('Add Markdown');
	const [editing, setEditing] = useState<boolean>(false);

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (ref.current && event.target && ref.current.contains(event.target as Node))
				return;
			setEditing(false);
		};
		document.addEventListener('click', listener, { capture: true });
		return () => {
			document.removeEventListener('click', listener, { capture: true });
		};
	}, []);

	if (editing) {
		return (
			<div className='text-editor' ref={ref}>
				<MDEditor value={text} onChange={setText} />
			</div>
		);
	}
	// Event prpgting
	return (
		<div className='text-editor' onClick={() => setEditing(true)}>
			<div className='card-content'>
				<MDEditor.Markdown source={text} />
			</div>
		</div>
	);
};
export default TextEditor;
