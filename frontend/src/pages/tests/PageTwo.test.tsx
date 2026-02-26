import { render } from '@testing-library/react';

import { expect, test } from 'vitest';

import { PageTwo } from '../PageTwo';

test('renders PageTwo', () => {
	const { getByTestId } = render(<PageTwo />);
	expect(getByTestId('PageTwo')).toBeDefined();
});
