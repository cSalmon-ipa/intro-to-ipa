import { useState } from 'react';
import { useLocation } from 'react-router';

import { useDemoByID } from 'actions/DemoAction';
import { Modal } from 'components/Modal';
import { TemplateComponent } from 'components/TemplateComponent';

export type Person = {
	id: number;
	username: string;
	name: string;
	age: number;
};

export const PageTwo = () => {
	const location = useLocation();
	const id = location.state as number | undefined;
	const [isEdit, setIsEdit] = useState(false);
	const isId = id ? true : false;
	const { data } = useDemoByID(id?.toString() ?? '', isId);
	return (
		<div data-testid='pageTwo' id='pageTwo'>
			<div className='bg-orange-400' data-testid='PageTwo' id='PageTwo'>
				<TemplateComponent content='PageTwo' />
			</div>
			{!data?.data ? (
				<div>
					<p>ID: </p>
					<p>Username: </p>
					<p>Name: </p>
					<p>Age: </p>
				</div>
			) : (
				<div>
					<p>ID: {id}</p>
					<p>Username: {data.data.username}</p>
					<p>Name: {data.data.name}</p>
					<p>Age: {data.data.age}</p>
					<button
						className='rounded-none bg-sky-400'
						onClick={() => {
							setIsEdit(true);
						}}
						type='button'
					>
						Edit
					</button>
					{isEdit ? <Modal editData={data.data} isOpen={isEdit} setModalState={setIsEdit} /> : null}
				</div>
			)}
		</div>
	);
};
