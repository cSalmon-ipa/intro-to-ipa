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
		mutationFn: (id: number) =>
			fetch(`/api/delete-demoPerson/${id.toString()}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(id),
			}),
		onSuccess: async () => {
			// Invalidate and refetch the 'users' query
			await queryClient.invalidateQueries({ queryKey: ['demo'] });
		},
	});
};

export const useApiCreateCall = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: updatePerson) =>
			fetch('/api/create-demoPerson/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			}),
		onSuccess: async () => {
			// Invalidate and refetch the 'users' query
			await queryClient.invalidateQueries({ queryKey: ['demo'] });
		},
	});
};

export const useApiUpdateCall = (id: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: Record<string, string | number>) =>
			fetch(`/api/update-demoPerson/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			}),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['demo-id', id] });
		},
	});
};
