import { Link } from 'react-router';

export const Navigation = () => (
	<nav className='flex h-12 justify-center gap-2 bg-green-700 text-blue-50 underline'>
		<Link className='flex h-full flex-col justify-center' to=''>
			test
		</Link>
		<Link className='flex h-full flex-col justify-center' to='one'>
			one
		</Link>
		<Link className='flex h-full flex-col justify-center' to='two'>
			two
		</Link>
	</nav>
);
