import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { container } from '@/core/config/container';

// GET /api/users - Get all users
export const GET: RequestHandler = async () => {
	try {
		const users = await container.useCases.user.getAll.execute();
		return json(users);
	} catch (err) {
		console.error('Error fetching users:', err);
		throw error(500, 'Failed to fetch users');
	}
};

// POST /api/users - Create a new user
export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		if (!body.email || !body.name) {
			throw error(400, 'Email and name are required');
		}

		const user = await container.useCases.user.create.execute({
			email: body.email,
			name: body.name
		});

		return json(user, { status: 201 });
	} catch (err) {
		if (err instanceof Error) {
			if (err.message.includes('already exists')) {
				throw error(409, err.message);
			}
			if (err.message.includes('Invalid email')) {
				throw error(400, err.message);
			}
		}
		console.error('Error creating user:', err);
		throw error(500, 'Failed to create user');
	}
};
