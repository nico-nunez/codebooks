import './Code-Cell.css';
import { useEffect } from 'react';
import Preview from '../Preview/Preview';
import CodeEditor from '../Code-Editor/code-editor';
import Resizable from '../Resizable/Resizable';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector, useIsAuthor } from '../../hooks';
import { Cell, SavedCell, Tab } from '../../state';

interface CodeCellProps {
	cell: Cell | SavedCell;
}

export interface TabsData {
	[key: number]: Tab;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { createBundle, updateTab, updateSavedStatus } = useActions();
	const tabsData = useTypedSelector(({ tabs }) => {
		const tabsData = tabs.order.map((id) => tabs.data[id]);
		return tabsData;
	});
	const activeTab = useTypedSelector(({ tabs }) => tabs.active) || tabsData[0];
	const bundle = useTypedSelector(({ bundles }) => bundles[cell.id]);
	const {
		id: tabId,
		code_language,
		content,
	} = tabsData.find((tab) => tab.id === activeTab) || tabsData[0];
	const isAuthor = useIsAuthor();

	useEffect(() => {
		if (!bundle) {
			createBundle(cell.id, code_language, content || '');
		}
		const timer = setTimeout(async () => {
			createBundle(cell.id, code_language, content || '');
		}, 1000);
		return () => clearTimeout(timer);
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tabId, content, code_language, cell.id, createBundle]);

	const onInputChange = (value: string) => {
		updateTab(tabId, value);
		if (isAuthor) updateSavedStatus(false);
	};
	return (
		<>
			<div className="code-cell">
				<Resizable direction="vertical">
					<div className="resizable-container">
						<Resizable direction="horiztonal">
							<CodeEditor
								initialValue={content || ''}
								code_language={code_language}
								onInputChange={onInputChange}
							/>
						</Resizable>
						<div className="progress-wrapper">
							{!bundle || bundle.loading ? (
								<div className="progress-cover">
									<progress className="progress is-small is-primary" max="100">
										Loading...
									</progress>
								</div>
							) : (
								<Preview
									code={bundle.code}
									error={bundle.error || bundle.warning}
								/>
							)}
						</div>
					</div>
				</Resizable>
			</div>
		</>
	);
};

export default CodeCell;
