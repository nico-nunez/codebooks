import { useToggle } from '../../hooks';

export interface DropdownProps {
	text: string;
	showIcon?: boolean;
}

const DropdownMenu: React.FC<DropdownProps> = ({
	text,
	showIcon = true,
	children,
}) => {
	const [isActive, toggleActive] = useToggle();
	return (
		<div
			className={`dropdown action-bar ${isActive && 'is-active'}`}
			onMouseEnter={() => toggleActive()}
			onMouseLeave={() => toggleActive()}
		>
			<div className="dropdown-trigger">
				<button
					className="button"
					aria-haspopup="true"
					aria-controls="dropdown-menu"
				>
					<span>{text}</span>
					<span className="icon is-small">
						{showIcon && (
							<i className="fas fa-angle-down" aria-hidden="true"></i>
						)}
					</span>
				</button>
			</div>
			<div className="dropdown-menu" id="dropdown-menu" role="menu">
				<div className="dropdown-content">{children}</div>
			</div>
		</div>
	);
};

export default DropdownMenu;
