import type { UserRepository } from '../../domain/user/UserRepository';
import { UserId } from '../../domain/user/UserId';

export class DeleteUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(id: string): Promise<void> {
		const userId = UserId.fromString(id);

		const exists = await this.userRepository.exists(userId);
		if (!exists) {
			throw new Error('User not found');
		}

		await this.userRepository.delete(userId);
	}
}
