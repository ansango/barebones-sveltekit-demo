import { Email } from '../../domain/user/Email';
import type { UserRepository } from '../../domain/user/UserRepository';
import { UserId } from '../../domain/user/UserId';

export interface UpdateUserInput {
	id: string;
	email?: string;
	name?: string;
}

export interface UpdateUserOutput {
	id: string;
	email: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export class UpdateUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
		const userId = UserId.fromString(input.id);
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new Error('User not found');
		}

		let newEmail: Email | undefined;
		if (input.email !== undefined) {
			newEmail = Email.create(input.email);

			const existingUser = await this.userRepository.findByEmail(newEmail);
			if (existingUser && !existingUser.id.equals(userId)) {
				throw new Error('Email already in use by another user');
			}
		}

		const updatedUser = user.update({
			name: input.name,
			email: newEmail
		});

		await this.userRepository.save(updatedUser);

		return {
			id: updatedUser.id.toString(),
			email: updatedUser.email.toString(),
			name: updatedUser.name,
			createdAt: updatedUser.createdAt,
			updatedAt: updatedUser.updatedAt
		};
	}
}
