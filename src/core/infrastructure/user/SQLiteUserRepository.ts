import { Database } from 'bun:sqlite';
import { User } from '../../domain/user/User';
import { UserId } from '../../domain/user/UserId';
import { Email } from '../../domain/user/Email';
import type { UserRepository } from '../../domain/user/UserRepository';

interface UserRow {
	id: string;
	email: string;
	name: string;
	created_at: string;
	updated_at: string;
}

export class SQLiteUserRepository implements UserRepository {
	private db: Database;

	constructor(databasePath: string = 'data/users.db') {
		this.db = new Database(databasePath, { create: true });
		this.initializeTable();
	}

	private initializeTable(): void {
		this.db.run(`
			CREATE TABLE IF NOT EXISTS users (
				id TEXT PRIMARY KEY,
				email TEXT UNIQUE NOT NULL,
				name TEXT NOT NULL,
				created_at TEXT NOT NULL,
				updated_at TEXT NOT NULL
			)
		`);
	}

	async findById(id: UserId): Promise<User | null> {
		const row = this.db
			.query<UserRow, [string]>('SELECT * FROM users WHERE id = ?')
			.get(id.toString());

		if (!row) {
			return null;
		}

		return this.toDomain(row);
	}

	async findByEmail(email: Email): Promise<User | null> {
		const row = this.db
			.query<UserRow, [string]>('SELECT * FROM users WHERE email = ?')
			.get(email.toString());

		if (!row) {
			return null;
		}

		return this.toDomain(row);
	}

	async findAll(): Promise<User[]> {
		const rows = this.db.query<UserRow, []>('SELECT * FROM users ORDER BY created_at DESC').all();

		return rows.map((row: UserRow) => this.toDomain(row));
	}

	async save(user: User): Promise<void> {
		const exists = await this.exists(user.id);

		if (exists) {
			this.db
				.query(
					`
				UPDATE users 
				SET email = ?, name = ?, updated_at = ?
				WHERE id = ?
			`
				)
				.run(user.email.toString(), user.name, user.updatedAt.toISOString(), user.id.toString());
		} else {
			this.db
				.query(
					`
				INSERT INTO users (id, email, name, created_at, updated_at)
				VALUES (?, ?, ?, ?, ?)
			`
				)
				.run(
					user.id.toString(),
					user.email.toString(),
					user.name,
					user.createdAt.toISOString(),
					user.updatedAt.toISOString()
				);
		}
	}

	async delete(id: UserId): Promise<void> {
		this.db.query('DELETE FROM users WHERE id = ?').run(id.toString());
	}

	async exists(id: UserId): Promise<boolean> {
		const row = this.db
			.query<{ count: number }, [string]>('SELECT COUNT(*) as count FROM users WHERE id = ?')
			.get(id.toString());

		return (row?.count ?? 0) > 0;
	}

	private toDomain(row: UserRow): User {
		return User.create({
			id: UserId.fromString(row.id),
			email: Email.create(row.email),
			name: row.name,
			createdAt: new Date(row.created_at),
			updatedAt: new Date(row.updated_at)
		});
	}

	close(): void {
		this.db.close();
	}
}
