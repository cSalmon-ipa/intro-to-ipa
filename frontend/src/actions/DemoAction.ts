import { useQuery } from '@tanstack/react-query';

import { z } from 'zod';

import { apiCall } from 'actions/utils';

const demoSchema = z.object({
	message: z.string(),
	data: z.array(
		z.object({
			id: z.number(),
			username: z.email(),
			name: z.string(),
			age: z.number(),
		}),
	),
});

// This is what connects to the backend to pull data
export const useDemo = () => {
	return useQuery({
		queryKey: ['demo'],
		queryFn: () => apiCall({ path: '/api/demo/', method: 'GET', schema: demoSchema }),
	});
};

// //post demoPerson data into database
// export const createDemoPerson = (contentBody: string) => {
// 	return useQuery({
// 		queryKey: ['createDemoPerson', contentBody],
// 		queryFn: () => apiCall({ path: '/api/create-demoPerson/', method: 'POST', body: contentBody, schema: demoSchema }),
// 		enabled: false,
// 	});
// };
