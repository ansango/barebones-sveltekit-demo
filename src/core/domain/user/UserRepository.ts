import type { User } from './User';
import type { UserId } from './UserId';
import type { Email } from './Email';

export interface UserRepository {
	findById(id: UserId): Promise<User | null>;
	findByEmail(email: Email): Promise<User | null>;
	findAll(): Promise<User[]>;
	save(user: User): Promise<void>;
	delete(id: UserId): Promise<void>;
	exists(id: UserId): Promise<boolean>;
}
