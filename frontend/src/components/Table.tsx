import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { useApiDeleteCall } from 'actions/DemoAction';

type TableProps = {
	readonly data: {
		id: number;
		username: string;
		name: string;
		age: number;
	}[];
};

type DemoPerson = {
	id: number;
	username: string;
	name: string;
	age: number;
};

export const Table = ({ data }: TableProps) => {
	const headers = Object.keys(data[0]);
	const [searchData, setSearchData] = useState(data);
	const [sortFormat, setSortFormat] = useState({ sortBy: 'id', sortDirection: 'asc' });
	const { mutate: deleteRecord } = useApiDeleteCall();

	useEffect(() => {
		setSearchData(data);
	}, [data]);

	const handleDeleteButton = (id: number) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			deleteRecord(id);
		}
	};

	const handleSortBySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const sortBy = e.target.value.toLowerCase();
		setSortFormat({ ...sortFormat, sortBy: sortBy });
	};

	const handleSortDirectionSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const sortDirection = e.target.value;
		setSortFormat({ ...sortFormat, sortDirection: sortDirection });
	};

	const handleSort = () => {
		const sortData = [...searchData];
		switch (sortFormat.sortBy) {
			case 'id':
				if (sortFormat.sortDirection === 'asc') {
					sortData.sort((a: DemoPerson, b: DemoPerson) => {
						return a.id - b.id;
					});
				} else {
					sortData.sort((a: DemoPerson, b: DemoPerson) => {
						return b.id - a.id;
					});
				}
				break;
			case 'username':
				if (sortFormat.sortDirection === 'asc') {
					sortData.sort((a: DemoPerson, b: DemoPerson) => {
						const usernameA = a.username;
						const usernameB = b.username;
						if (usernameA < usernameB) {
							return -1;
						} else if (usernameA > usernameB) {
							return 1;
						}
						return 0;
					});
				} else {
					sortData.sort((a: DemoPerson, b: DemoPerson) => {
						const usernameA = a.username;
						const usernameB = b.username;
						if (usernameA > usernameB) {
							return -1;
						} else if (usernameA < usernameB) {
							return 1;
						}
						return 0;
					});
				}
				break;
			case 'name':
				if (sortFormat.sortDirection === 'asc') {
					sortData.sort((a: DemoPerson, b: DemoPerson) => {
						const nameA = a.name;
						const nameB = b.name;
						if (nameA < nameB) {
							return -1;
						} else if (nameA > nameB) {
							return 1;
						}
						return 0;
					});
				} else {
					sortData.sort((a: DemoPerson, b: DemoPerson) => {
						const nameA = a.name;
						const nameB = b.name;
						if (nameA > nameB) {
							return -1;
						} else if (nameA < nameB) {
							return 1;
						}
						return 0;
					});
				}
				break;
			case 'age':
				if (sortFormat.sortDirection === 'asc') {
					sortData.sort((a: DemoPerson, b: DemoPerson) => {
						return a.age - b.age;
					});
				} else {
					sortData.sort((a: DemoPerson, b: DemoPerson) => {
						return b.age - a.age;
					});
				}
				break;
		}

		setSearchData(sortData);
	};

	const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value.trim().toLowerCase();
		if (input === '') {
			setSearchData(data);
		} else {
			const filteredData = searchData.filter((demoPerson) => {
				if (
					demoPerson.id.toString().startsWith(input) ||
					demoPerson.username.toLowerCase().startsWith(input) ||
					demoPerson.name.toLowerCase().startsWith(input) ||
					demoPerson.age.toString().startsWith(input)
				) {
					return true;
				}
				return false;
			});
			setSearchData(filteredData);
		}
	};

	return (
		<div data-testid='table' id='table'>
			<div className='flex'>
				<form>
					<label className='block text-sm font-medium text-slate-700' htmlFor='introToIPA-pageOne-demoPersonSortSelect'>
						Search:
					</label>
					<input
						className='block rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
						id='introToIPA-pageOne-demoPersonSearchBar'
						onChange={handleSearchInput}
						type='search'
					/>
				</form>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSort();
					}}
				>
					<label className='block text-sm font-medium text-slate-700' htmlFor='introToIPA-pageOne-demoPersonSortSelect'>
						Sort By:
					</label>
					<div className='flex justify-start'>
						<select
							className='block border border-gray-300 bg-gray-50'
							id='introToIPA-pageOne-demoPersonSortSelect'
							onChange={handleSortBySelection}
						>
							{headers.map((header) => (
								<option key={header} value={header}>
									{header.toUpperCase()}
								</option>
							))}
						</select>
						<select
							className='block appearance-none border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
							id='introToIPA-pageOne-demoPersonSortDirectionSelect'
							onChange={handleSortDirectionSelection}
						>
							<option key='asc' value='asc'>
								asc
							</option>
							<option key='desc' value='desc'>
								desc
							</option>
						</select>
						<button
							className='rounded-lg bg-gray-200 px-5 hover:bg-gray-300'
							id='introToIPA-pageOne-demoPersonSortButton'
							type='submit'
						>
							Sort
						</button>
					</div>
				</form>
			</div>
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
					{searchData.map((person) => (
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
									className='rounded-md bg-red-400 p-2 text-white hover:bg-red-500'
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
