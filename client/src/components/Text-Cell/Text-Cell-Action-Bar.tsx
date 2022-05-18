import { Id } from '../../state';
import ActionBarControls from '../Action-Bar/Action-Bar-Controls';
import ActionBarWrapper from '../Action-Bar/Action-Bar-Wrapper';

interface ActionBarProps {
	id: Id;
}

const TextCellActionBar: React.FC<ActionBarProps> = ({ id }) => {
	return (
		<ActionBarWrapper>
			<ActionBarControls id={id} />
		</ActionBarWrapper>
	);
};

export default TextCellActionBar;
