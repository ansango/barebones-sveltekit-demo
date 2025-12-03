import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { container } from '$core/config/container';

// GET /api/users - Get all users
export const GET: RequestHandler = async () => {
	try {
		const users = await container.useCases.user.getAll.execute();
		return json(users);
	} catch (err) {
		console.error('Error fetching users:', err);
		return json({ message: 'Failed to fetch users' }, { status: 500 });
	}
};

// POST /api/users - Create a new user
export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		if (!body.email || !body.name) {
			return json({ message: 'Email and name are required' }, { status: 400 });
		}

		const user = await container.useCases.user.create.execute({
			email: body.email,
			name: body.name
		});

		return json(user, { status: 201 });
	} catch (err) {
		if (err instanceof Error) {
			if (err.message.includes('already exists')) {
				return json({ message: err.message }, { status: 409 });
			}
			if (err.message.includes('Invalid email')) {
				return json({ message: err.message }, { status: 400 });
			}
		}
		console.error('Error creating user:', err);
		return json({ message: 'Failed to create user' }, { status: 500 });
	}
};
