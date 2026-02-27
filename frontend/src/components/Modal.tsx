import { useState } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
	setModalState: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
};

export const Modal = ({ setModalState, isOpen }: ModalProps) => {
	const [formData, setFormData] = useState({ username: '', name: '', age: 0 });
	const pageLoaded = document.getElementById('pageOne');

	if (pageLoaded) {
		if (isOpen) {
			pageLoaded.style.filter = 'blur(5px)';
		}
	}

	const handleCloseModal = () => {
		const pageLoaded = document.getElementById('pageOne');

		if (pageLoaded) {
			pageLoaded.style.filter = 'blur(0px)';
		}
		setModalState(false);
	};

	const handleSaveButton = async () => {
		console.log(formData);
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: formData.username,
				name: formData.name,
				age: formData.age,
			}),
		};
		await fetch('/api/create-demoPerson/', requestOptions).then((response) =>
			response.json().then((data) => {
				console.log(data);
			}),
		);
		handleCloseModal();
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

	// Objective 3 Form should check for:
	// 	- duplicate entries?
	// 	- valid email address
	// 	- valid age
	//  - valid name
	//  - trim all spaces

	return createPortal(
		<div
			className='absolute left-1/2 top-1/2 flex size-80 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-b-black bg-slate-200'
			id='introToIPA-pageOne-createDemoPersonModal'
		>
			<div className='h-fit'>
				<form id='introToIPA-pageOne-createDemoPersonForm'>
					<div className='mb-5'>
						<label
							className='block text-sm font-medium text-slate-700'
							htmlFor='introToIPA-pageOne-createDemoPerson-inputUsername'
						>
							Username
						</label>
						<input
							className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
							id='introToIPA-pageOne-createDemoPerson-inputUsername'
							onChange={handleUsernameInput}
							placeholder='name@provider.com'
							required
							type='email'
						/>
					</div>
					<div className='mb-5'>
						<label
							className='block text-sm font-medium text-slate-700'
							htmlFor='introToIPA-pageOne-createDemoPerson-inputName'
						>
							Name
						</label>
						<input
							className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
							id='introToIPA-pageOne-createDemoPerson-inputName'
							onChange={handleNameInput}
							required
							type='text'
						/>
					</div>
					<div className='mb-5'>
						<label
							className='block text-sm font-medium text-slate-700'
							htmlFor='introToIPA-pageOne-createDemoPerson-inputAge'
						>
							Age
						</label>
						<input
							className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
							defaultValue={0}
							id='introToIPA-pageOne-createDemoPerson-inputAge'
							min={0}
							onChange={handleAgeInput}
							placeholder='0'
							required
							type='number'
						/>
					</div>
					{/* make sure you can't manually put in lower tha 0 */}

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
							onClick={() => {
								handleSaveButton();
							}}
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

export const Form = () => {};
