import { useState } from 'react';

import { useDemo } from 'actions/DemoAction';
import { Modal } from 'components/Modal';
import { PopUpDialog } from 'components/PopUpDialog';
import { Table } from 'components/Table';
import { TemplateComponent } from 'components/TemplateComponent';

export const PageOne = () => {
	const [isOpen, setModalState] = useState(false);
	const { isLoading, data } = useDemo();
	const [dialogContent, setDialogState] = useState({ isOpen: false, type: '', errorCode: '', message: '' });

	return (
		<div id='pageOne'>
			<div className='bg-green-200' data-testid='PageOne' id='PageOne'>
				<TemplateComponent content='PageOne' />
			</div>
			<div className='flex justify-center'>
				<div className='grid place-items-center'>
					{!isLoading && data ? <Table data={data.data} setDialogState={setDialogState} /> : null}
					<button
						className='float-end mt-4 rounded-lg bg-sky-500 px-4 py-3 text-center text-white hover:bg-sky-600'
						data-testid='introToIPA-pageOne-createDemoPersonButton'
						id='introToIPA-pageOne-createDemoPersonButton'
						onClick={() => {
							setModalState(true);
						}}
						type='button'
					>
						Create
					</button>
				</div>
			</div>
			{isOpen ? <Modal isOpen={isOpen} setDialogState={setDialogState} setModalState={setModalState} /> : null}
			{dialogContent.isOpen ? <PopUpDialog dialogContent={dialogContent} setDialogState={setDialogState} /> : null}
		</div>
	);
};
