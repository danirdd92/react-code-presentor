import { useTypedSelector } from '../hooks/use-typed-selector';

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cells: { order, data } }) =>
		order.map((id) => data[id])
	);

	return <div></div>;
};

export default CellList;
