import { Outlet } from 'react-router';

import { Navigation } from 'components/Navigation';

export const MainContainer = () => (
	<div>
		<Navigation />
		<Outlet />
	</div>
);
