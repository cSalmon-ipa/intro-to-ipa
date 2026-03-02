import { useMutation, useQueryClient } from '@tanstack/react-query';

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
	const headers = Object.keys(data[0]);
	const queryClient = useQueryClient();

	const apiDeleteCall = useMutation({
		mutationFn: (id: number) =>
			fetch(`/api/delete-demoPerson/${id.toString()}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(id),
			}),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['demo'] });
		},
	});

	const handleDeleteButton = (id: number) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			// mutate(id);
			apiDeleteCall.mutate(id);
		}
	};

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
									state={person.id}
									to={`/Two/${person.id.toString()}`}
								>
									{person.name}
								</Link>
							</td>
							<td>{person.age}</td>
							<td>
								<button
									className='rounded-none bg-red-400'
									id='introToIPA-pageOne-demoPersonTable-removeDemoPerson'
									onClick={() => {
										handleDeleteButton(person.id);
									}}
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
