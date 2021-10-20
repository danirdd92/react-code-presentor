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
		const formattedCode = prettier.format(input, {
			parser: 'babel',
			plugins: [parser],
			useTabs: false,
			semi: true,
			singleQuote: true,
		});
		onEditorChange(formattedCode);
		console.log(formattedCode);
	};

	return (
		<div>
			<button onClick={onFormatClick}>Format</button>
			<MonacoEditor
				theme='vs-dark'
				height={500}
				defaultLanguage='javascript'
				defaultValue=''
				value={input}
				onChange={onEditorChange}
				options={{
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
