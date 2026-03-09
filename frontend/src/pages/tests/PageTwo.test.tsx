import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { PageTwo } from '../PageTwo';

const queryClient = new QueryClient();
describe('PageTwo tests', () => {
	it('Renders PageTwo', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<PageTwo />
				</MemoryRouter>
			</QueryClientProvider>,
		);
		const pageTwo = screen.getByTestId('PageTwo');
		expect(pageTwo).toBeDefined();
	});
});
