import type { UserRepository } from '../../domain/user/UserRepository';
import { UserId } from '../../domain/user/UserId';

export interface GetUserByIdOutput {
	id: string;
	email: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export class GetUserByIdUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(id: string): Promise<GetUserByIdOutput | null> {
		const userId = UserId.fromString(id);
		const user = await this.userRepository.findById(userId);

		if (!user) {
			return null;
		}

		return {
			id: user.id.toString(),
			email: user.email.toString(),
			name: user.name,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		};
	}
}
