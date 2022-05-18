import { shallowEqual } from 'react-redux';
import { useTypedSelector } from '../../hooks';
import NavbarDropdown from './Navbar-Drowdown';

interface RecentPagesProps {
	onLinkClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const RecentPages: React.FC<RecentPagesProps> = ({ onLinkClick }) => {
	const recents = useTypedSelector(({ pages }) => {
		return pages.recent.slice(-5).map((id) => {
			return {
				id,
				page_name: pages.data[id]?.page_name || '',
			};
		});
	}, shallowEqual);
	return (
		<NavbarDropdown title="Recent">
			{recents.reverse().map(({ id, page_name }) => {
				return (
					<a href={`/pages/${id}`} key={id} onClick={onLinkClick}>
						{page_name}
					</a>
				);
			})}
		</NavbarDropdown>
	);
};

export default RecentPages;
