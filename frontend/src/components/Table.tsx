import { Link } from 'react-router';

type TableProps = {
	readonly data: {
		id: number;
		username: string;
		name: string;
		age: number;
	}[];
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
						<th>DELETE</th>
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
									DELETE
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
