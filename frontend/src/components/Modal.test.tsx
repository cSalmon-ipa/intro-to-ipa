import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { Modal, validateAge, validateName, validateUsername } from './Modal';

const queryClient = new QueryClient();
describe('Modal tests', () => {
	const mockSetState = vi.fn();
	const mockData = {
		id: 1,
		username: 'test1@test1.com',
		name: 'test1',
		age: 1,
	};

	it('Renders modal for create form', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<Modal isOpen={true} setModalState={mockSetState} />
			</QueryClientProvider>,
		);
		const modal = screen.getByTestId('introToIPA-pageOne-createDemoPersonModal');
		expect(modal).toBeDefined();
	});

	it('Renders modal for edit form', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<Modal editData={mockData} isOpen={true} setModalState={mockSetState} />
			</QueryClientProvider>,
		);
		const modal = screen.getByTestId('introToIPA-pageOne-createDemoPersonModal');
		expect(modal).toBeDefined();
	});

	it('Test age validation', () => {
		const numberNan = NaN;
		const numberUndefined = undefined;
		const negativeDigits = -1115;
		const digitsOver16 = parseInt('34237442353450239429382');
		const goodNumber = 16;

		const numberNanTest = validateAge(numberNan);
		const numberUndefinedTest = validateAge(numberUndefined);
		const negativeDigitsTest = validateAge(negativeDigits);
		const digitsOver16Test = validateAge(digitsOver16);
		const goodNumberTest = validateAge(goodNumber);

		expect(numberNanTest.ageError).toBe(true);
		expect(numberNanTest.ageErrorMsg).toBe('Age must have a value');

		expect(numberUndefinedTest.ageError).toBe(true);
		expect(numberUndefinedTest.ageErrorMsg).toBe('Age must have a value');

		expect(negativeDigitsTest.ageError).toBe(true);
		expect(negativeDigitsTest.ageErrorMsg).toBe('Age cannot be negative value');

		expect(digitsOver16Test.ageError).toBe(true);
		expect(digitsOver16Test.ageErrorMsg).toBe('Age must be less than 16 digits. Are they truly that old?');

		expect(goodNumberTest.ageError).toBe(false);
		expect(goodNumberTest.ageErrorMsg).toBe('');
	});

	it('Test name validation', () => {
		const goodName = 'Good name';
		const noName = '';
		const undefinedName = undefined;

		const goodNameTest = validateName(goodName);
		const noNameTest = validateName(noName);
		const undefinedTest = validateName(undefinedName);

		expect(goodNameTest.nameError).toBe(false);
		expect(goodNameTest.nameErrorMsg).toBe('');

		expect(noNameTest.nameError).toBe(true);
		expect(noNameTest.nameErrorMsg).toBe('Name is required');

		expect(undefinedTest.nameError).toBe(true);
		expect(undefinedTest.nameErrorMsg).toBe('Name is required');
	});

	it('Test username validation', () => {
		const goodUsername = 'test@test.com';
		const noUsername = '';
		const undefinedUsername = undefined;
		const badSyntaxUsername = 'test.test.com';

		const goodUsernameTest = validateUsername(goodUsername);
		const noUsernameTest = validateUsername(noUsername);
		const undefinedUsernameTest = validateUsername(undefinedUsername);
		const badSyntaxUsernameTest = validateUsername(badSyntaxUsername);

		expect(goodUsernameTest.usernameError).toBe(false);
		expect(goodUsernameTest.usernameErrorMsg).toBe('');

		expect(noUsernameTest.usernameError).toBe(true);
		expect(noUsernameTest.usernameErrorMsg).toBe('Username is required');

		expect(undefinedUsernameTest.usernameError).toBe(true);
		expect(undefinedUsernameTest.usernameErrorMsg).toBe('Username is required');

		expect(badSyntaxUsernameTest.usernameError).toBe(true);
		expect(badSyntaxUsernameTest.usernameErrorMsg).toBe('Invalid syntax for username');
	});
});
