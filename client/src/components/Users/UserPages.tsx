import { useEffect } from 'react';
import PageCard from '../PageCard/PageCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypedSelector, useActions } from '../../hooks';
import { Page, SavedPage } from '../../state';

const UsersPages = () => {
	const { userId } = useParams();
	const navigate = useNavigate();
	const { fetchUserPages } = useActions();
	const auth = useTypedSelector(({ auth }) => auth);
	const error = useTypedSelector(({ pages: { error } }) => error);
	const userPages = useTypedSelector(({ pages }) => {
		const userPages: Page[] = [];
		for (const id in pages.data) {
			const author = pages.data[id].user_id;
			if (author && author === parseInt(userId || ''))
				userPages.push(pages.data[id]);
		}
		return userPages;
	});
	useEffect(() => {
		if (userId) fetchUserPages(parseInt(userId));
	}, [userId, fetchUserPages]);
	const renderedUserPages = userPages.map((page) => {
		return (
			<div className="column is-one-third" key={page.id}>
				<PageCard page={page as SavedPage} author={false} />
			</div>
		);
	});
	return (
		<div className="columns">
			{error && <div className="error-messages">{error}</div>}
			<div className="column is-three-quarters m-auto mt-6">
				<h1 className="is-size-3 has-text-centered">My Book</h1>
				<div className="columns mt-4">{renderedUserPages}</div>
			</div>
		</div>
	);
};

export default UsersPages;
