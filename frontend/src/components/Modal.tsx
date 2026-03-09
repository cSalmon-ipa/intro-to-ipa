import { useState } from 'react';
import { createPortal } from 'react-dom';

import { useApiCreateCall, useApiUpdateCall } from 'actions/DemoAction';
import { Person } from 'pages/PageTwo';

type ModalProps = {
	setModalState: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
	editData?: Person; // Data to be edited if accessed by Edit button on Page 2
};

export const validateAge = (age: number | undefined) => {
	if (age === undefined || Number.isNaN(age)) {
		return { ageError: true, ageErrorMsg: 'Age must have a value' };
	} else if (age.toString().length > 16) {
		return { ageError: true, ageErrorMsg: 'Age must be less than 16 digits. Are they truly that old?' };
	} else if (age < 0) {
		return { ageError: true, ageErrorMsg: 'Age cannot be negative value' };
	}
	return { ageError: false, ageErrorMsg: '' };
};

export const validateName = (name: string | undefined) => {
	if (name === '' || name === undefined) {
		return { nameError: true, nameErrorMsg: 'Name is required' };
	}
	return { nameError: false, nameErrorMsg: '' };
};

export const validateUsername = (username: string | undefined) => {
	const syntax = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (username === '' || username === undefined) {
		return { usernameError: true, usernameErrorMsg: 'Username is required' };
	} else if (!syntax.test(username)) {
		return { usernameError: true, usernameErrorMsg: 'Invalid syntax for username' };
	}
	return { usernameError: false, usernameErrorMsg: '' };
};

export const Modal = ({ setModalState, isOpen, editData }: ModalProps) => {
	const isEdit = editData ? true : false;
	const [formData, setFormData] = useState(
		isEdit
			? { username: editData?.username, name: editData?.name, age: editData?.age }
			: { username: '', name: '', age: 0 },
	);
	const [err, setErr] = useState({
		usernameError: false,
		usernameErrorMsg: '',
		nameError: false,
		nameErrorMsg: '',
		ageError: false,
		ageErrorMsg: '',
	});
	const pageLoaded = isEdit ? document.getElementById('pageTwo') : document.getElementById('pageOne');
	const { mutate: createRecord } = useApiCreateCall();
	const { mutate: updateRecord } = useApiUpdateCall(editData?.id.toString() ?? '');

	if (pageLoaded) {
		if (isOpen) {
			pageLoaded.style.filter = 'blur(5px)';
		}
	}

	const handleCloseModal = () => {
		const pageLoadedClose = isEdit ? document.getElementById('pageTwo') : document.getElementById('pageOne');

		if (pageLoadedClose) {
			pageLoadedClose.style.filter = 'blur(0px)';
		}
		setModalState(false);
	};

	// If editing, updates record. Else, creates new record
	const handleSaveButton = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let error = err;

		if (isEdit) {
			if (editData?.id) {
				const body: Record<string, string | number> = {};
				if (formData.username && formData.username !== editData.username) {
					body.username = formData.username.trim();
					Object.assign(error, validateUsername(body.username));
				}
				if (formData.name && formData.name !== editData.name) {
					body.name = formData.name.trim();
					Object.assign(error, validateName(body.name));
				}
				if (formData.age && formData.age !== editData.age) {
					body.age = parseInt(formData.age.toString().replace(/^0+(?=\d)/, ''));
					Object.assign(error, validateAge(body.age));
				}
				if (!error.ageError && !error.nameError && !error.usernameError) {
					updateRecord(body);
				}
			}
		} else {
			const body = {
				username: formData.username?.trim(),
				name: formData.name?.trim(),
				age: formData.age,
			};

			error = {
				...validateUsername(formData.username?.trim()),
				...validateName(formData.name?.trim()),
				...validateAge(formData.age),
			};

			if (!error.ageError && !error.nameError && !error.usernameError) {
				createRecord(body);
			}
		}

		setErr({ ...error });

		if (!error.ageError && !error.nameError && !error.usernameError) {
			handleCloseModal();
		}
	};

	const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, username: e.target.value });
	};

	const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, name: e.target.value });
	};

	const handleAgeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, age: e.target.valueAsNumber });
	};

	return createPortal(
		<div
			className='absolute left-1/2 top-1/2 flex h-auto w-80 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-b-black bg-slate-200 py-8'
			data-testid='introToIPA-pageOne-createDemoPersonModal'
			id='introToIPA-pageOne-createDemoPersonModal'
		>
			<div className='h-fit'>
				<form
					id='introToIPA-pageOne-createDemoPersonForm'
					onSubmit={(e) => {
						handleSaveButton(e);
					}}
				>
					<div className='mb-5'>
						{isEdit ? <span>ID: {editData?.id} </span> : null}
						<label
							className='block text-sm font-medium text-slate-700'
							htmlFor='introToIPA-pageOne-createDemoPerson-inputUsername'
						>
							Username
						</label>
						<input
							className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
							id='introToIPA-pageOne-createDemoPerson-inputUsername'
							onBlur={() => {
								setErr({ ...err, ...validateUsername(formData.username) });
							}}
							onChange={handleUsernameInput}
							placeholder='name@provider.com'
							type='email'
							value={formData.username}
						/>
						{err.usernameError ? <span className='text-red-400'>{err.usernameErrorMsg}</span> : null}
					</div>
					<div className='mb-5'>
						<label
							className='block text-sm font-medium text-slate-700'
							htmlFor='introToIPA-pageOne-createDemoPerson-inputName'
						>
							Name
						</label>
						<input
							className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
							id='introToIPA-pageOne-createDemoPerson-inputName'
							onBlur={() => {
								setErr({ ...err, ...validateName(formData.name) });
							}}
							onChange={handleNameInput}
							placeholder='John Doe'
							type='text'
							value={formData.name}
						/>
						{err.nameError ? <span className='text-red-400'>{err.nameErrorMsg}</span> : null}
					</div>
					<div className='mb-5'>
						<label
							className='block text-sm font-medium text-slate-700'
							htmlFor='introToIPA-pageOne-createDemoPerson-inputAge'
						>
							Age
						</label>
						<input
							className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
							id='introToIPA-pageOne-createDemoPerson-inputAge'
							min={0}
							onBlur={() => {
								setErr({ ...err, ...validateAge(formData.age) });
							}}
							onChange={handleAgeInput}
							placeholder='0'
							type='number'
							value={formData.age}
						/>
						{err.ageError ? <span className='text-red-400'>{err.ageErrorMsg}</span> : null}
					</div>
					<div className='flex w-full justify-between'>
						<button
							className='w-25 hover:bg-red-450 rounded-lg bg-red-400 px-5 py-2 text-center text-white hover:bg-red-500'
							id='introToIPA-pageOne-createDemoPerson-cancelButton'
							onClick={() => {
								handleCloseModal();
							}}
							type='button'
						>
							Cancel
						</button>
						<button
							className='w-25 rounded-lg bg-green-400 px-5 py-2 text-center text-white hover:bg-green-450'
							id='introToIPA-pageOne-createDemoPerson-saveButton'
							type='submit'
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>,
		document.body,
	);
};
// export const forTests = {
// 	validateAge: Function,
// 	validateName: Function,
// 	validateUsername: Function,
// };
