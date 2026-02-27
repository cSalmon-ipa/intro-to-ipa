import { useState } from 'react';
import { useLocation } from 'react-router';

import { TemplateComponent } from 'components/TemplateComponent';

type Person = {
	id: number;
	username: string;
	name: string;
	age: number;
};

export const PageTwo = () => {
	const location = useLocation();
	const person = location.state as Person | undefined;
	const [isEdit, setIsEdit] = useState(false);
	const [formData, setFormData] = useState({ username: '', name: '', age: 0 });

	const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, username: e.target.value });
	};

	const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, name: e.target.value });
	};

	const handleAgeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, age: e.target.valueAsNumber });
	};

	return (
		<div>
			<div className='bg-orange-400' data-testid='PageTwo' id='PageTwo'>
				<TemplateComponent content='PageTwo' />
			</div>
			{!person ? null : !isEdit ? (
				<div>
					<p>ID: {person.id}</p>
					<p>Username: {person.username}</p>
					<p>Name: {person.name}</p>
					<p>Age: {person.age}</p>
					<button
						className='rounded-none bg-sky-400'
						onClick={() => {
							setIsEdit(true);
						}}
						type='button'
					>
						Edit
					</button>
				</div>
			) : (
				<div>
					<form>
						<label className='block'>
							<span className='block text-sm font-medium text-slate-700'>Username</span>
							<input
								className='border--black border-2'
								id='introToIPA-pageTwo-editDemoPerson-inputUsername'
								onChange={handleUsernameInput}
								type='email'
							/>
							<span className='block text-sm font-medium text-slate-700'>Name</span>
							<input
								className='border--black border-2'
								id='introToIPA-pageTwo-editDemoPerson-inputName'
								onChange={handleNameInput}
								type='text'
							/>
							<span className='block text-sm font-medium text-slate-700'>Age</span>
							<input
								className='border--black border-2'
								id='introToIPA-pageTwo-editDemoPerson-inputAge'
								min={0}
								onChange={handleAgeInput}
								type='number'
							/>
							{/* make sure you can't manually put in lower tha 0 */}
						</label>
						<div>
							<button
								className='rounded-none bg-red-400'
								id='introToIPA-pageTwo-editDemoPerson-cancelButton'
								onClick={() => {
									setIsEdit(false);
								}}
								type='button'
							>
								Cancel
							</button>
							<button
								className='rounded-none bg-green-400'
								id='introToIPA-pageTwo-editDemoPerson-saveButton'
								onClick={() => {
									setIsEdit(false);
								}}
								type='submit'
							>
								Save
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};
