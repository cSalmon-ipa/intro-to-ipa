import { useQuery } from '@tanstack/react-query';

import { z } from 'zod';

import { apiCall } from 'actions/utils';

const demoSchema = z.object({
	name: z.string(),
	age: z.number(),
});

// This is what connects to the backend to pull data
export const useDemo = () => {
	return useQuery({
		queryKey: ['demo'],
		queryFn: () => apiCall({ path: 'api/demo', method: 'GET', schema: demoSchema }),
	});
};
