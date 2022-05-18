import './App.css';
import Landing from './Landing';
import Page from './Page/Page';
import { useEffect } from 'react';
import { useActions } from '../hooks';
import NotFound from './NotFound';
import UserPages from './Users/UserPages';
import UserProfile from './Users/UserProfile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
	const { authenticateSession } = useActions();
	useEffect(() => {
		authenticateSession();
		return;
	}, [authenticateSession]);

	return (
		<BrowserRouter>
			<div>
				{/* <Navbar /> */}
				<Routes>
					<Route path="/" element={<Landing />}>
						<Route index element={<Page />} />
						<Route path="pages/:pageId" element={<Page />} />
						<Route path="users/:userId" element={<UserProfile />} />
						<Route path="users/:userId/pages" element={<UserPages />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
