import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { container } from '@/core/config/container';

// GET /api/users/:id - Get user by ID
export const GET: RequestHandler = async ({ params }) => {
	try {
		const user = await container.useCases.user.getById.execute(params.id);

		if (!user) {
			throw error(404, 'User not found');
		}

		return json(user);
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		if (err instanceof Error && err.message.includes('cannot be empty')) {
			throw error(400, 'Invalid user ID');
		}
		console.error('Error fetching user:', err);
		throw error(500, 'Failed to fetch user');
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
				throw error(404, err.message);
			}
			if (err.message.includes('already in use')) {
				throw error(409, err.message);
			}
			if (err.message.includes('Invalid email') || err.message.includes('cannot be empty')) {
				throw error(400, err.message);
			}
		}
		console.error('Error updating user:', err);
		throw error(500, 'Failed to update user');
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
				throw error(404, err.message);
			}
			if (err.message.includes('cannot be empty')) {
				throw error(400, 'Invalid user ID');
			}
		}
		console.error('Error deleting user:', err);
		throw error(500, 'Failed to delete user');
	}
};
