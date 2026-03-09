import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

const demoByIdSchema = z.object({
	message: z.string(),
	data: z.object({
		id: z.number(),
		username: z.email(),
		name: z.string(),
		age: z.number(),
	}),
});

type updatePerson = {
	username: string | undefined;
	name: string | undefined;
	age: number | undefined;
};

interface ApiResponseBody {
	status: 'success' | 'error';
	data: object;
	message: string;
}

// This is what connects to the backend to pull data
export const useDemo = () => {
	return useQuery({
		queryKey: ['demo'],
		queryFn: () => apiCall({ path: '/api/demo/', method: 'GET', schema: demoSchema }),
		enabled: true,
	});
};

export const useDemoByID = (id: string, isEnabled: boolean) => {
	return useQuery({
		queryKey: ['demo-id', id],
		queryFn: () => apiCall({ path: `/api/demoByID/${id}`, method: 'GET', schema: demoByIdSchema }),
		enabled: isEnabled,
	});
};

export const useApiDeleteCall = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			const response = await fetch(`/api/delete-demoPerson/${id.toString()}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(id),
			});
			if (!response.ok) {
				const errorData = (await response.json()) as ApiResponseBody;
				throw new Error(`${errorData.message} Error code: ${response.status.toString()} ${response.statusText}`);
			}
			return response;
		},
		onSuccess: async () => {
			// Invalidate and refetch the 'users' query
			await queryClient.invalidateQueries({ queryKey: ['demo'] });
		},
		onError: (error) => {
			alert(error.message);
		},
	});
};

// export const useApiDeleteCall = () => {
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: (id: number) =>
// 			fetch(`/api/delete-demoPerson/${id.toString()}`, {
// 				method: 'DELETE',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify(id),
// 			}),
// 		onSuccess: async () => {
// 			// Invalidate and refetch the 'users' query
// 			await queryClient.invalidateQueries({ queryKey: ['demo'] });
// 		},
// 	});
// };

export const useApiCreateCall = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (body: updatePerson) => {
			const response = await fetch('/api/create-demoPerson/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			if (!response.ok) {
				const errorData = (await response.json()) as ApiResponseBody;

				throw new Error(`${errorData.message} Error code: ${response.status.toString()} ${response.statusText}`);
			}
			return response;
		},

		onSuccess: async () => {
			alert(`Record created`);
			// Invalidate and refetch the 'users' query
			await queryClient.invalidateQueries({ queryKey: ['demo'] });
		},
		onError: (error) => {
			alert(error.message);
		},
	});
};

export const useApiUpdateCall = (id: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (body: Record<string, string | number>) => {
			const response = await fetch(`/api/update-demoPerson/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			if (!response.ok) {
				const errorData = (await response.json()) as ApiResponseBody;

				throw new Error(`${errorData.message} Error code: ${response.status.toString()} ${response.statusText}`);
			}
			return response;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['demo-id', id] });
		},
		onError: (error) => {
			alert(error.message);
		},
	});
};
