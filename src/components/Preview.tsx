import html from '../utils/html-boiler-plate';
import { useEffect, useRef } from 'react';
interface PreviewProps {
	code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcdoc = html;
		iframe.current.contentWindow.postMessage(code, '*');
	}, [code]);

	return (
		<iframe
			style={{ backgroundColor: 'white' }}
			title='preview'
			ref={iframe}
			sandbox='allow-scripts'
			srcDoc={html}
		/>
	);
};

export default Preview;
