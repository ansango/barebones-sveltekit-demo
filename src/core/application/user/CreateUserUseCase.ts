import { User } from '../../domain/user/User';
import { UserId } from '../../domain/user/UserId';
import { Email } from '../../domain/user/Email';
import type { UserRepository } from '../../domain/user/UserRepository';

/**
 * Input data for creating a new user.
 */
export interface CreateUserInput {
	/** User email address (must be valid format) */
	email: string;
	/** User full name (required, non-empty) */
	name: string;
}

/**
 * Output data returned after successful user creation.
 */
export interface CreateUserOutput {
	/** Unique user identifier */
	id: string;
	/** User email address */
	email: string;
	/** User full name */
	name: string;
	/** Timestamp when user was created */
	createdAt: Date;
	/** Timestamp when user was last updated */
	updatedAt: Date;
}

/**
 * Use Case for creating a new user in the system.
 *
 * Orchestrates the user creation process by:
 * 1. Validating email format through Email value object
 * 2. Checking email uniqueness in the repository
 * 3. Creating a User domain entity with generated ID
 * 4. Persisting the user through the repository
 *
 * Part of the Application layer - depends on Domain, used by Infrastructure.
 *
 * @example
 * ```ts
 * // In container.ts
 * const createUserUseCase = new CreateUserUseCase(userRepository);
 *
 * // In +server.ts
 * const user = await createUserUseCase.execute({
 *   email: 'john.doe@example.com',
 *   name: 'John Doe'
 * });
 * console.log(`User created with ID: ${user.id}`);
 * ```
 */
export class CreateUserUseCase {
	/**
	 * @param userRepository - Repository for user persistence and retrieval
	 */
	constructor(private readonly userRepository: UserRepository) {}

	/**
	 * Executes the user creation use case.
	 *
	 * Validates the email format, ensures uniqueness, creates the user entity,
	 * and persists it to the database. Returns the created user data.
	 *
	 * @param input - User creation data
	 * @param input.email - User email address (must be valid format)
	 * @param input.name - User full name (required, non-empty)
	 * @returns Promise with created user data including generated ID and timestamps
	 * @throws {Error} If email format is invalid (thrown by Email.create)
	 * @throws {Error} If user with email already exists in the system
	 * @throws {Error} If name is empty (thrown by User.create)
	 * @throws {Error} If database save operation fails
	 *
	 * @example
	 * ```ts
	 * try {
	 *   const newUser = await createUserUseCase.execute({
	 *     email: 'jane@example.com',
	 *     name: 'Jane Smith'
	 *   });
	 *   console.log('User created:', newUser.id);
	 * } catch (error) {
	 *   if (error.message.includes('already exists')) {
	 *     console.error('Email already registered');
	 *   }
	 * }
	 * ```
	 */
	async execute(input: CreateUserInput): Promise<CreateUserOutput> {
		const email = Email.create(input.email);

		const existingUser = await this.userRepository.findByEmail(email);
		if (existingUser) {
			throw new Error('User with this email already exists');
		}

		const now = new Date();
		const user = User.create({
			id: UserId.generate(),
			email,
			name: input.name,
			createdAt: now,
			updatedAt: now
		});

		await this.userRepository.save(user);

		return {
			id: user.id.toString(),
			email: user.email.toString(),
			name: user.name,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		};
	}
}
