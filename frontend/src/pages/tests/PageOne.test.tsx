import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { PageOne } from 'pages/PageOne';

const queryClient = new QueryClient();
describe('PageOne tests', () => {
	it('Renders PageOne', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<PageOne />
			</QueryClientProvider>,
		);
		const pageOne = screen.getByTestId('PageOne');
		expect(pageOne).toBeDefined();

		// const { getByTestId } = render(<PageOne />);
		// expect(getByTestId('PageOne')).toBeDefined();
	});
});
