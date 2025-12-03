import { SQLiteUserRepository } from '../infrastructure/user/SQLiteUserRepository';

import { CreateUserUseCase } from '../application/user/CreateUserUseCase';
import { GetUserByIdUseCase } from '../application/user/GetUserByIdUseCase';
import { GetAllUsersUseCase } from '../application/user/GetAllUsersUseCase';
import { UpdateUserUseCase } from '../application/user/UpdateUserUseCase';
import { DeleteUserUseCase } from '../application/user/DeleteUserUseCase';

// Repository instances
const userRepository = new SQLiteUserRepository('data/users.db');

// Use case instances with injected dependencies
export const createUserUseCase = new CreateUserUseCase(userRepository);
export const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
export const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
export const updateUserUseCase = new UpdateUserUseCase(userRepository);
export const deleteUserUseCase = new DeleteUserUseCase(userRepository);

// Export container object for organized access
export const container = {
	useCases: {
		user: {
			create: createUserUseCase,
			getById: getUserByIdUseCase,
			getAll: getAllUsersUseCase,
			update: updateUserUseCase,
			delete: deleteUserUseCase
		}
	}
} as const;
