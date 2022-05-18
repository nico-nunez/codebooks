export interface DropdownItemProps {
	content?: string | null;
	active?: boolean;
	link?: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
	content,
	active = false,
	link = false,
}) => {
	if (!content) return <hr className="dropdown-divider" />;
	return (
		<span className={`dropdown-item ${active && 'is-active'}`}>{content}</span>
	);
};

export default DropdownItem;
