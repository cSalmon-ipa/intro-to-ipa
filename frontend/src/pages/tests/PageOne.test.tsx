import { render } from '@testing-library/react';

import { expect, test } from 'vitest';

import { PageOne } from 'pages/PageOne';

test('renders PageOne', () => {
	const { getByTestId } = render(<PageOne />);
	expect(getByTestId('PageOne')).toBeDefined();
});
