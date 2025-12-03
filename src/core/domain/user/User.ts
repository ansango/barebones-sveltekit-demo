import type { UserId } from './UserId';
import type { Email } from './Email';

export interface UserProps {
	id: UserId;
	email: Email;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export class User {
	private constructor(private readonly props: UserProps) {}

	static create(props: UserProps): User {
		if (!props.name || props.name.trim().length === 0) {
			throw new Error('User name cannot be empty');
		}
		return new User({
			...props,
			name: props.name.trim()
		});
	}

	get id(): UserId {
		return this.props.id;
	}

	get email(): Email {
		return this.props.email;
	}

	get name(): string {
		return this.props.name;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get updatedAt(): Date {
		return this.props.updatedAt;
	}

	rename(newName: string): User {
		if (!newName || newName.trim().length === 0) {
			throw new Error('User name cannot be empty');
		}
		return new User({
			...this.props,
			name: newName.trim(),
			updatedAt: new Date()
		});
	}

	changeEmail(newEmail: Email): User {
		return new User({
			...this.props,
			email: newEmail,
			updatedAt: new Date()
		});
	}

	update(props: { name?: string; email?: Email }): User {
		let updated = this as User;

		if (props.name !== undefined) {
			updated = updated.rename(props.name);
		}

		if (props.email !== undefined) {
			updated = updated.changeEmail(props.email);
		}

		return updated;
	}
}
