export const NotFound = () => (
	<div data-testid='notFound'>
		<div className='flex flex-col pl-20 pt-16'>
			<p className='text-xl font-bold'>Sorry to leave you hang&apos;n!</p>
			<div className='pb-14'>
				<img alt='' src='/static/404PlusLogo.svg' />
			</div>
			<div>
				<strong>Try these steps:</strong>
			</div>
			<div className='pl-4'>
				<ul>
					<li>Check the URL</li>
					<li>Fix code</li>
					<li>Go back</li>
				</ul>
			</div>
		</div>
		<div className='innerBox'>
			<img alt='' src='/static/404illustration.svg' />
		</div>
	</div>
);
