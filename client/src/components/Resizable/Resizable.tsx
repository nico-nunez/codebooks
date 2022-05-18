import './resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState } from 'react';

interface ResizableProps {
	direction: 'horiztonal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [width, setWidth] = useState(window.innerWidth * 0.5);

	const verticalProps: ResizableBoxProps = {
		height: 500,
		width: Infinity,
		minConstraints: [Infinity, 50],
		maxConstraints: [Infinity, innerHeight * 0.95],
		resizeHandles: ['s'],
	};

	const horizontalProps: ResizableBoxProps = {
		className: 'resize-horizontal',
		height: Infinity,
		width: width,
		minConstraints: [200, Infinity],
		maxConstraints: [innerWidth * 0.9, Infinity],
		resizeHandles: ['e'],
		onResizeStop: (event, data) => {
			setWidth(data.size.width);
		},
	};

	const boxProps = direction === 'vertical' ? verticalProps : horizontalProps;

	useEffect(() => {
		const handleResize = () => {
			let timer = setTimeout(() => {
				setInnerHeight(window.innerHeight);
				setInnerWidth(window.innerWidth);
				if (window.innerWidth * 0.8 < width) {
					setWidth(window.innerWidth * 0.8);
				}
			}, 100);

			return () => clearTimeout(timer);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [width]);

	return <ResizableBox {...boxProps}>{children}</ResizableBox>;
};

export default Resizable;
