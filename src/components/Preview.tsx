import './Preview.css';
import html from '../utils/html-boiler-plate';
import { useEffect, useRef } from 'react';
interface PreviewProps {
	code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcdoc = html;
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);

	return (
		<div className='preview-wrapper'>
			<iframe title='preview' ref={iframe} sandbox='allow-scripts' srcDoc={html} />
		</div>
	);
};

export default Preview;
