import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import { Table } from './Table';

const queryClient = new QueryClient();
describe('renders Table', () => {
	const dialogSetState = vi.fn();
	const data = [
		{
			id: 1,
			username: 'test1@test1.com',
			name: 'test1',
			age: 1,
		},
		{
			id: 2,
			username: 'test2@test2.com',
			name: 'test2',
			age: 2,
		},
		{
			id: 3,
			username: 'test3@test3.com',
			name: 'test3',
			age: 3,
		},
	];
	it('renders Table', () => {
		render(
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<Table data={data} setDialogState={dialogSetState} />
				</QueryClientProvider>
			</BrowserRouter>,
		);
		const table = screen.getByTestId('table');
		expect(table).toBeDefined();
	});
});
