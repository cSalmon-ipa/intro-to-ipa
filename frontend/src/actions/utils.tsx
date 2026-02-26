import { z } from 'zod';

export const apiCall = async <T,>({
	method,
	body,
	path,
	schema,
}: ({ method: 'GET'; body?: never } | { method: 'POST'; body: BodyInit }) & { path: string; schema: z.ZodType<T> }) => {
	const response = await fetch(path, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	});
	return schema.parse(await response.json());
};
