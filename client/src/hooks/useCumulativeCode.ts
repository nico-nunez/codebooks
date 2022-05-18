import { EditorLanguages } from '../components/Code-Editor/code-editor';
import { useTypedSelector } from './useTypeSelector';

export const useCumulativeCode = (
	cellId: string,
	code_language: EditorLanguages
) => {
	return useTypedSelector(({ tabs }) => {
		const cumulative: string[] = [];
		for (const id of tabs.order) {
			if (tabs.data[id].code_language === code_language) {
				cumulative.push(tabs.data[id].content || '');
			}
		}
		return cumulative;
	}).join('\n');
};
