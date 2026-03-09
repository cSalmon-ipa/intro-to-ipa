import { createPortal } from 'react-dom';

type DialogProps = {
	dialogContent: {
		isOpen: boolean;
		type: string;
		errorCode: string;
		message: string;
	};
	// oxlint-disable-next-line typescript/no-unsafe-function-type
	confirmAction?: Function;
	setDialogState: React.Dispatch<
		React.SetStateAction<{ isOpen: boolean; type: string; errorCode: string; message: string }>
	>;
};

export enum DialogType {
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
	CONFIRM = 'CONFIRM',
}

export const PopUpDialog = ({ dialogContent, setDialogState }: DialogProps) => {
	let bannerColor: { bg: string; hoverBg: string };
	const type = dialogContent.type as DialogType;
	switch (type) {
		case DialogType.ERROR:
			bannerColor = { bg: 'bg-red-400', hoverBg: 'hover:bg-red-500' };
			break;
		case DialogType.SUCCESS:
			bannerColor = { bg: 'bg-green-400', hoverBg: 'hover:bg-green-450' };
			break;
		case DialogType.CONFIRM:
			bannerColor = { bg: 'bg-sky-400', hoverBg: 'hover:bg-green-600' };
			break;
	}

	const handleCloseDialog = () => {
		setDialogState({ isOpen: false, type: '', errorCode: '', message: '' });
	};

	if ((dialogContent.type as DialogType) === DialogType.SUCCESS) {
		setTimeout(handleCloseDialog, 1500);
	}

	return createPortal(
		<div
			className='absolute left-1/2 top-1/2 flex h-auto w-80 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-b-black bg-slate-200'
			data-testid='introToIPA-pageOne-createDemoPersonModal'
			id='introToIPA-pageOne-createDemoPersonModal'
		>
			{/* Record could not be created. Error code: 400 Bad Request */}
			<div className='w-full'>
				<div className={`flex w-full items-center justify-between ${bannerColor.bg} px-4 py-2`}>
					<p className='text-lg font-bold text-white'>
						{(dialogContent.type as DialogType) === DialogType.ERROR ? 'Error' : 'Success!'}
					</p>
					<button
						className={`font-sm rounded-lg px-4 py-2 text-sm text-white ${bannerColor.hoverBg}`}
						onClick={handleCloseDialog}
						type='button'
					>
						X
					</button>
				</div>
				{(dialogContent.type as DialogType) === DialogType.ERROR ? (
					<div className='bg-red-500 p-2 px-4 text-sm text-white'>{dialogContent.errorCode}</div>
				) : null}
				<div className='px-4 py-5'>{dialogContent.message}</div>
			</div>
		</div>,
		document.body,
	);
};
