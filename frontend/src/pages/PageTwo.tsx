import { useState } from 'react';
import { useLocation } from 'react-router';

import { useDemoByID } from 'actions/DemoAction';
import { Modal } from 'components/Modal';
import { PopUpDialog } from 'components/PopUpDialog';
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
	const [dialogContent, setDialogState] = useState({ isOpen: false, type: '', errorCode: '', message: '' });
	const [isEdit, setIsEdit] = useState(false);
	const isId = id ? true : false;
	const { data } = useDemoByID(id?.toString() ?? '', isId);
	const demoRecordContainerCSS = 'relative w-fit mt-5 py-5 px-10 border-2 border-gray-300 bg-slate-50 border-b-black';
	const demoRecordPaddingCSS = 'py-1';
	const idCSS = 'absolute p-2 left-0 top-0 text-sm font-medium text-slate-700';

	return (
		<div data-testid='pageTwo' id='pageTwo'>
			<div className='bg-orange-400' data-testid='PageTwo' id='PageTwo'>
				<TemplateComponent content='PageTwo' />
			</div>
			<div className='flex justify-center'>
				{!data?.data ? (
					<div className='mt-5 grid place-items-center'>
						<p>Select a record from PageOne.</p>
						<div className={demoRecordContainerCSS}>
							<p className={idCSS}>ID: </p>
							<p className={`mt-4 ${demoRecordPaddingCSS}`}>Username: </p>
							<p className={demoRecordPaddingCSS}>Name: </p>
							<p className={demoRecordPaddingCSS}>Age: </p>
						</div>
					</div>
				) : (
					<div className='grid place-items-center'>
						<div className={demoRecordContainerCSS}>
							<p className={idCSS}>ID: {id}</p>
							<p className={`mt-4 ${demoRecordPaddingCSS}`}>Username: {data.data.username}</p>
							<p className={demoRecordPaddingCSS}>Name: {data.data.name}</p>
							<p className={demoRecordPaddingCSS}>Age: {data.data.age}</p>
						</div>
						<button
							className='mt-4 rounded-lg bg-sky-500 px-4 py-2 text-center text-white hover:bg-sky-600'
							onClick={() => {
								setIsEdit(true);
							}}
							type='button'
						>
							Edit
						</button>
						{isEdit ? (
							<Modal editData={data.data} isOpen={isEdit} setDialogState={setDialogState} setModalState={setIsEdit} />
						) : null}
					</div>
				)}
				{dialogContent.isOpen ? <PopUpDialog dialogContent={dialogContent} setDialogState={setDialogState} /> : null}
			</div>
		</div>
	);
};
