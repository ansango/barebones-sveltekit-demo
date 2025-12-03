import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { container } from '$core/config/container';

// GET /api/users/:id - Get user by ID
export const GET: RequestHandler = async ({ params }) => {
	try {
		const user = await container.useCases.user.getById.execute(params.id);

		if (!user) {
			return json({ message: 'User not found' }, { status: 404 });
		}

		return json(user);
	} catch (err) {
		if (err instanceof Error && err.message.includes('cannot be empty')) {
			return json({ message: 'Invalid user ID' }, { status: 400 });
		}
		console.error('Error fetching user:', err);
		return json({ message: 'Failed to fetch user' }, { status: 500 });
	}
};

// PATCH /api/users/:id - Update user
export const PATCH: RequestHandler = async ({ params, request }) => {
	try {
		const body = await request.json();

		const user = await container.useCases.user.update.execute({
			id: params.id,
			email: body.email,
			name: body.name
		});

		return json(user);
	} catch (err) {
		if (err instanceof Error) {
			if (err.message === 'User not found') {
				return json({ message: err.message }, { status: 404 });
			}
			if (err.message.includes('already in use')) {
				return json({ message: err.message }, { status: 409 });
			}
			if (err.message.includes('Invalid email') || err.message.includes('cannot be empty')) {
				return json({ message: err.message }, { status: 400 });
			}
		}
		console.error('Error updating user:', err);
		return json({ message: 'Failed to update user' }, { status: 500 });
	}
};

// DELETE /api/users/:id - Delete user
export const DELETE: RequestHandler = async ({ params }) => {
	try {
		await container.useCases.user.delete.execute(params.id);
		return new Response(null, { status: 204 });
	} catch (err) {
		if (err instanceof Error) {
			if (err.message === 'User not found') {
				return json({ message: err.message }, { status: 404 });
			}
			if (err.message.includes('cannot be empty')) {
				return json({ message: 'Invalid user ID' }, { status: 400 });
			}
		}
		console.error('Error deleting user:', err);
		return json({ message: 'Failed to delete user' }, { status: 500 });
	}
};
