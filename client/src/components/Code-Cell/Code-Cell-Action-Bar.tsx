import { Cell, SavedCell } from '../../state';
import { shallowEqual } from 'react-redux';
import { useTypedSelector } from '../../hooks';
import ActionBarTab from '../Action-Bar/Action-Bar-Tab';
import ActionBarControls from '../Action-Bar/Action-Bar-Controls';
import ActionBarWrapper from '../Action-Bar/Action-Bar-Wrapper';

interface ActionBarProps {
	cell: Cell | SavedCell;
}

const CodeCellActionBar: React.FC<ActionBarProps> = ({ cell }) => {
	const order = useTypedSelector(({ tabs }) => tabs.order);
	const activeTab = useTypedSelector(({ tabs }) => tabs.active || order[0]);
	const tabLangs = useTypedSelector(
		({ tabs }) => order.map((id) => tabs.data[id].code_language),
		shallowEqual
	);
	const renderedTabs = order.map((id, i) => {
		return (
			<ActionBarTab
				tab_id={id}
				code_langauge={tabLangs[i]}
				isActive={activeTab === id}
				key={id}
			/>
		);
	});
	return (
		<ActionBarWrapper>
			<div className="action-bar-tabs">{renderedTabs}</div>
			<ActionBarControls id={cell.id} />
		</ActionBarWrapper>
	);
};

export default CodeCellActionBar;
