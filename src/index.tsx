import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from './components/CodeCell';
import ReactDOM from 'react-dom';

const App = () => {
	return (
		<div>
			<CodeCell />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
