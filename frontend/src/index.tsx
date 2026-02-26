// oxlint-disable no-non-null-assertion

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { TemplateComponent } from 'components/TemplateComponent';
import { MainContainer } from 'containers/MainContainer';
import { NotFound } from 'pages/NotFound';
import { PageOne } from 'pages/PageOne';

import './index.css';

const router = createBrowserRouter([
	{
		element: <MainContainer />,
		errorElement: <NotFound />,
		children: [
			{
				path: '',
				element: (
					<div className='bg-blue-200' data-testid='Home' id='Home'>
						<TemplateComponent content='Home' />
					</div>
				),
			},
			{
				path: '/One',
				element: <PageOne />,
			},
		],
	},
]);

const queryClient = new QueryClient({});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	<QueryClientProvider client={queryClient}>
		<ReactQueryDevtools buttonPosition='bottom-left' initialIsOpen={false} />
		<RouterProvider router={router} />
	</QueryClientProvider>,
);
