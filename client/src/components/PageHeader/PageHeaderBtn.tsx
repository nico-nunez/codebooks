interface PageHeaderBtnProps {
	text: string;
	className?: string;
	onClick: () => void;
	disabled?: boolean;
}

const PageHeaderBtn: React.FC<PageHeaderBtnProps> = ({
	text,
	className,
	onClick,
	disabled,
}) => {
	return (
		<button
			className={`button is-small is-rounded ${className} action-bar-button`}
			onClick={onClick}
			disabled={disabled}
		>
			{text}
		</button>
	);
};

export default PageHeaderBtn;
