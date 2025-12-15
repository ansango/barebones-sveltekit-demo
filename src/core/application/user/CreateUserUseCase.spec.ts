import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateUserUseCase } from './CreateUserUseCase';
import type { UserRepository } from '../../domain/user/UserRepository';
import { User } from '../../domain/user/User';
import { UserId } from '../../domain/user/UserId';
import { Email } from '../../domain/user/Email';

describe('CreateUserUseCase', () => {
	let mockRepository: UserRepository;
	let useCase: CreateUserUseCase;

	beforeEach(() => {
		mockRepository = {
			findById: vi.fn(),
			findByEmail: vi.fn(),
			save: vi.fn(),
			delete: vi.fn(),
			findAll: vi.fn(),
			exists: vi.fn()
		};
		useCase = new CreateUserUseCase(mockRepository);
	});

	it('should create a new user successfully', async () => {
		// Arrange
		const input = {
			email: 'john.doe@example.com',
			name: 'John Doe'
		};
		vi.mocked(mockRepository.findByEmail).mockResolvedValue(null);
		vi.mocked(mockRepository.save).mockResolvedValue();

		// Act
		const result = await useCase.execute(input);

		// Assert
		expect(result).toEqual({
			id: expect.any(String),
			email: input.email,
			name: input.name,
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date)
		});
		expect(mockRepository.findByEmail).toHaveBeenCalledWith(expect.any(Email));
		expect(mockRepository.save).toHaveBeenCalledWith(expect.any(User));
	});

	it('should throw error when user with email already exists', async () => {
		// Arrange
		const input = {
			email: 'existing@example.com',
			name: 'Jane Doe'
		};
		const existingUser = User.create({
			id: UserId.generate(),
			email: Email.create('existing@example.com'),
			name: 'Existing User',
			createdAt: new Date(),
			updatedAt: new Date()
		});
		vi.mocked(mockRepository.findByEmail).mockResolvedValue(existingUser);

		// Act & Assert
		await expect(useCase.execute(input)).rejects.toThrow('User with this email already exists');
		expect(mockRepository.findByEmail).toHaveBeenCalledWith(expect.any(Email));
		expect(mockRepository.save).not.toHaveBeenCalled();
	});

	it('should throw error for invalid email format', async () => {
		// Arrange
		const input = {
			email: 'invalid-email',
			name: 'Test User'
		};

		// Act & Assert
		await expect(useCase.execute(input)).rejects.toThrow();
		expect(mockRepository.findByEmail).not.toHaveBeenCalled();
		expect(mockRepository.save).not.toHaveBeenCalled();
	});

	it('should set createdAt and updatedAt to the same timestamp', async () => {
		// Arrange
		const input = {
			email: 'timestamp@example.com',
			name: 'Timestamp User'
		};
		vi.mocked(mockRepository.findByEmail).mockResolvedValue(null);
		vi.mocked(mockRepository.save).mockResolvedValue();

		// Act
		const result = await useCase.execute(input);

		// Assert
		expect(result.createdAt).toEqual(result.updatedAt);
	});

	it('should generate unique user ID', async () => {
		// Arrange
		const input = {
			email: 'unique@example.com',
			name: 'Unique User'
		};
		vi.mocked(mockRepository.findByEmail).mockResolvedValue(null);
		vi.mocked(mockRepository.save).mockResolvedValue();

		// Act
		const result = await useCase.execute(input);

		// Assert
		expect(result.id).toBeTruthy();
		expect(typeof result.id).toBe('string');
		expect(result.id.length).toBeGreaterThan(0);
	});
});
