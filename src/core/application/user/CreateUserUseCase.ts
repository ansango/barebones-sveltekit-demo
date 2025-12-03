import { User } from '../../domain/user/User';
import { UserId } from '../../domain/user/UserId';
import { Email } from '../../domain/user/Email';
import type { UserRepository } from '../../domain/user/UserRepository';

export interface CreateUserInput {
	email: string;
	name: string;
}

export interface CreateUserOutput {
	id: string;
	email: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export class CreateUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

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
