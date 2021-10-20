import './CodeEditor.css';

import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

type CodeEditorProps = {
	input: string;
	onChange: (input: string) => void;
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ input, onChange }) => {
	const onEditorChange = (code: string | undefined) => onChange(code || '');

	const onFormatClick = () => {
		console.log(input);
		const formattedCode = prettier
			.format(input, {
				parser: 'babel',
				plugins: [parser],
				useTabs: false,
				semi: true,
				singleQuote: true,
			})
			.replace(/\n$/, '');
		onEditorChange(formattedCode);
		console.log(formattedCode);
	};

	return (
		<div className='editor-wrapper'>
			<button className='button button-format is-primary' onClick={onFormatClick}>
				Format
			</button>
			<MonacoEditor
				theme='vs-dark'
				height={500}
				defaultLanguage='javascript'
				defaultValue=''
				value={input}
				onChange={onEditorChange}
				options={{
					formatOnType: true,
					minimap: {
						enabled: false,
					},
					wordWrap: 'on',
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true,
					tabSize: 2,
				}}
			/>
		</div>
	);
};
// Try `npm i --save-dev @types/monaco-jsx-highlighter` if it exists or add a new declaration (.d.ts) file containing `declare module 'monaco-jsx-highlighter';`
