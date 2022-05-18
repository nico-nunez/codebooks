interface ActionButtonProps {
	onClick: () => void;
	icon?: string;
	text?: string;
	active?: boolean;
	className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
	onClick,
	icon,
	text,
	className,
	active = false,
}) => {
	const renderedIcon = () => {
		return (
			<span className={`icon ${className}`}>
				<i className={`fa-solid ${icon}`}></i>
			</span>
		);
	};
	return (
		<button
			className={`button is-small ${active && 'active'}`}
			onClick={onClick}
		>
			{icon && renderedIcon()}
			{text}
		</button>
	);
};

export default ActionButton;
