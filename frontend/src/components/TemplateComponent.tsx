// these are what will be used on your pages, such as a data table or custom buttons etc..

import { createPortal } from 'react-dom';
import { Link } from 'react-router';

type Props = {
	readonly content: string;
};

type ModalProps = {
	setModalState: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
};

type TableProps = {
	readonly data: {
		id: number;
		username: string;
		name: string;
		age: number;
	}[];
};

export const TemplateComponent = ({ content }: Props) => (
	<div data-testid='test' id='test'>
		<p>{content}</p>
	</div>
);

export const Modal = ({ setModalState, isOpen }: ModalProps) => {
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

	return createPortal(
		<div
			className='absolute left-1/2 top-1/2 flex size-60 -translate-x-1/2 -translate-y-1/2 justify-center border-4 border-b-black'
			id='introToIPA-pageOne-createDemoPersonModal'
		>
			<div>
				<form id='introToIPA-pageOne-createDemoPersonForm'>
					<label className='block' id='introToIPA-pageOne-createDemoPersonLabel'>
						<span className='block text-sm font-medium text-slate-700'>Username</span>
						<input
							className='border--black border-2'
							id='introToIPA-pageOne-createDemoPerson-inputUsername'
							type='email'
						/>
						<span className='block text-sm font-medium text-slate-700'>Name</span>
						<input className='border--black border-2' id='introToIPA-pageOne-createDemoPerson-inputName' type='text' />
						<span className='block text-sm font-medium text-slate-700'>Age</span>
						<input
							className='border--black border-2'
							id='introToIPA-pageOne-createDemoPerson-inputAge'
							min={0}
							type='number'
						/>
						{/* make sure you can't manually put in lower tha 0 */}
					</label>
					<div className='absolute bottom-0 right-0'>
						<button
							className='rounded-none bg-red-400'
							id='introToIPA-pageOne-createDemoPerson-cancelButton'
							onClick={() => {
								handleCloseModal();
							}}
							type='button'
						>
							Cancel
						</button>
						<button
							className='rounded-none bg-green-400'
							id='introToIPA-pageOne-createDemoPerson-saveButton'
							onClick={() => {
								handleCloseModal();
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

export const Table = ({ data }: TableProps) => {
	//FIX PROPERTY TYPE LATER
	const headers = Object.keys(data[0]);

	return (
		<div data-testid='table' id='table'>
			<table className='table-auto' id='introToIPA-pageOne-demoPersonTable'>
				<thead>
					<tr>
						{headers.map((header) => (
							<th key={header}>{header.toUpperCase()}</th>
						))}
						<th>REMOVE</th>
					</tr>
				</thead>
				<tbody>
					{data.map((person) => (
						<tr key={person.id}>
							<td>{person.id}</td>
							<td>{person.username}</td>
							<td>
								<Link
									className='font-bold text-blue-600 underline'
									id='introToIPA-pageOne-demoPersonTable-Link'
									state={person}
									to='/Two'
								>
									{person.name}
								</Link>
							</td>
							<td>{person.age}</td>
							<td>
								{/* make confirmation screen */}
								<button
									className='rounded-none bg-red-400'
									id='introToIPA-pageOne-demoPersonTable-removeDemoPerson'
									type='button'
								>
									Remove
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
