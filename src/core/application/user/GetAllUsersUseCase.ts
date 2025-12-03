import type { UserRepository } from '../../domain/user/UserRepository';

export interface GetAllUsersOutput {
	id: string;
	email: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export class GetAllUsersUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(): Promise<GetAllUsersOutput[]> {
		const users = await this.userRepository.findAll();

		return users.map((user) => ({
			id: user.id.toString(),
			email: user.email.toString(),
			name: user.name,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		}));
	}
}
