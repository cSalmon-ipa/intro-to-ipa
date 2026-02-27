import { useState } from 'react';

import { useDemo } from 'actions/DemoAction';
import { Modal } from 'components/Modal';
import { Table } from 'components/Table';
import { TemplateComponent } from 'components/TemplateComponent';

export const PageOne = () => {
	const [isOpen, setModalState] = useState(false);
	// const {isLoading, error, data} = useDemo();
	// if (error) console.log(error);
	const { isLoading, data } = useDemo();

	return (
		<div id='pageOne'>
			<div className='bg-green-200' data-testid='PageOne' id='PageOne'>
				<TemplateComponent content='PageOne' />
			</div>
			{!isLoading && data ? <Table data={data.data} /> : null}
			<button
				className='rounded-full bg-sky-400'
				id='introToIPA-pageOne-createDemoPerson Button'
				onClick={() => {
					setModalState(true);
				}}
				type='button'
			>
				Create
			</button>
			{isOpen ? <Modal isOpen={isOpen} setModalState={setModalState} /> : null}
		</div>
	);
};
