import Navbar from './Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useTypedSelector } from '../hooks';

const Landing = () => {
	// const error = useTypedSelector(({ pages: { error } }) => error);
	return (
		<>
			<Navbar />
			{/* {error && <div className="error-messages">{error}</div>} */}
			<Outlet />
		</>
	);
};

export default Landing;
