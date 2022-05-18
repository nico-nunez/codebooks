import React from 'react';
import { Id } from '../../state';
import { useActions } from '../../hooks';

interface ActionBarTabProps {
	tab_id: Id;
	code_langauge: string;
	isActive: boolean;
}

export const ActionBarTab: React.FC<ActionBarTabProps> = ({
	tab_id,
	code_langauge,
	isActive,
}) => {
	const { updateActiveTab } = useActions();
	return (
		<div
			className={`action-bar-tab ${isActive && 'active'}`}
			onClick={() => updateActiveTab(tab_id)}
		>
			<span>{code_langauge}</span>
		</div>
	);
};

export default ActionBarTab;
