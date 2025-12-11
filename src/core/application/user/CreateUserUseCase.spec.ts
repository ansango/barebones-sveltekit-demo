import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CreateUserUseCase, type CreateUserInput } from './CreateUserUseCase';
import type { UserRepository } from '../../domain/user/UserRepository';
import { Email } from '../../domain/user/Email';
import { UserId } from '../../domain/user/UserId';
import { User } from '../../domain/user/User';

describe('CreateUserUseCase', () => {
	let mockRepository: UserRepository;
	let useCase: CreateUserUseCase;

	beforeEach(() => {
		mockRepository = {
			findById: vi.fn(),
			findByEmail: vi.fn(),
			findAll: vi.fn(),
			save: vi.fn(),
			delete: vi.fn(),
			exists: vi.fn()
		};
		useCase = new CreateUserUseCase(mockRepository);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should create user successfully when email does not exist', async () => {
		// Arrange
		const input: CreateUserInput = {
			email: 'john@example.com',
			name: 'John Doe'
		};

		vi.mocked(mockRepository.findByEmail).mockResolvedValue(null);
		vi.mocked(mockRepository.save).mockResolvedValue();

		const mockUserId = 'user-123';
		vi.spyOn(UserId, 'generate').mockReturnValue(UserId.fromString(mockUserId));

		// Act
		const result = await useCase.execute(input);

		// Assert
		expect(result).toBeDefined();
		expect(result.id).toBe(mockUserId);
		expect(result.email).toBe(input.email.toLowerCase());
		expect(result.name).toBe(input.name);
		expect(result.createdAt).toBeInstanceOf(Date);
		expect(result.updatedAt).toBeInstanceOf(Date);
		expect(result.createdAt).toEqual(result.updatedAt);
	});

	it('should call repository methods with correct parameters', async () => {
		// Arrange
		const input: CreateUserInput = {
			email: 'jane@example.com',
			name: 'Jane Smith'
		};

		vi.mocked(mockRepository.findByEmail).mockResolvedValue(null);
		vi.mocked(mockRepository.save).mockResolvedValue();

		const mockUserId = 'user-456';
		vi.spyOn(UserId, 'generate').mockReturnValue(UserId.fromString(mockUserId));

		// Act
		await useCase.execute(input);

		// Assert
		expect(mockRepository.findByEmail).toHaveBeenCalledTimes(1);
		expect(mockRepository.findByEmail).toHaveBeenCalledWith(expect.any(Email));
		expect(mockRepository.save).toHaveBeenCalledTimes(1);
		expect(mockRepository.save).toHaveBeenCalledWith(expect.any(User));
	});

	it('should throw error when user with email already exists', async () => {
		// Arrange
		const input: CreateUserInput = {
			email: 'existing@example.com',
			name: 'Existing User'
		};

		const existingUser = User.create({
			id: UserId.fromString('existing-user-id'),
			email: Email.create(input.email),
			name: 'Existing Name',
			createdAt: new Date(),
			updatedAt: new Date()
		});

		vi.mocked(mockRepository.findByEmail).mockResolvedValue(existingUser);

		// Act & Assert
		await expect(useCase.execute(input)).rejects.toThrow('User with this email already exists');
		expect(mockRepository.save).not.toHaveBeenCalled();
	});

	it('should normalize email to lowercase', async () => {
		// Arrange
		const input: CreateUserInput = {
			email: 'UPPERCASE@EXAMPLE.COM',
			name: 'Test User'
		};

		vi.mocked(mockRepository.findByEmail).mockResolvedValue(null);
		vi.mocked(mockRepository.save).mockResolvedValue();

		const mockUserId = 'user-789';
		vi.spyOn(UserId, 'generate').mockReturnValue(UserId.fromString(mockUserId));

		// Act
		const result = await useCase.execute(input);

		// Assert
		expect(result.email).toBe('uppercase@example.com');
	});

	it('should throw error when email format is invalid', async () => {
		// Arrange
		const input: CreateUserInput = {
			email: 'invalid-email',
			name: 'Test User'
		};

		// Act & Assert
		await expect(useCase.execute(input)).rejects.toThrow('Invalid email: invalid-email');
		expect(mockRepository.findByEmail).not.toHaveBeenCalled();
		expect(mockRepository.save).not.toHaveBeenCalled();
	});

	it('should trim whitespace from name', async () => {
		// Arrange
		const input: CreateUserInput = {
			email: 'test@example.com',
			name: '  Whitespace Name  '
		};

		vi.mocked(mockRepository.findByEmail).mockResolvedValue(null);
		vi.mocked(mockRepository.save).mockResolvedValue();

		const mockUserId = 'user-abc';
		vi.spyOn(UserId, 'generate').mockReturnValue(UserId.fromString(mockUserId));

		// Act
		const result = await useCase.execute(input);

		// Assert
		expect(result.name).toBe('Whitespace Name');
	});

	it('should set createdAt and updatedAt to the same timestamp', async () => {
		// Arrange
		const input: CreateUserInput = {
			email: 'time@example.com',
			name: 'Time Test'
		};

		vi.mocked(mockRepository.findByEmail).mockResolvedValue(null);
		vi.mocked(mockRepository.save).mockResolvedValue();

		const mockUserId = 'user-time';
		vi.spyOn(UserId, 'generate').mockReturnValue(UserId.fromString(mockUserId));

		const beforeExecution = new Date();

		// Act
		const result = await useCase.execute(input);

		const afterExecution = new Date();

		// Assert
		expect(result.createdAt.getTime()).toBeGreaterThanOrEqual(beforeExecution.getTime());
		expect(result.createdAt.getTime()).toBeLessThanOrEqual(afterExecution.getTime());
		expect(result.createdAt).toEqual(result.updatedAt);
	});

	it('should generate unique user id', async () => {
		// Arrange
		const input: CreateUserInput = {
			email: 'id@example.com',
			name: 'ID Test'
		};

		vi.mocked(mockRepository.findByEmail).mockResolvedValue(null);
		vi.mocked(mockRepository.save).mockResolvedValue();

		// Act
		const result = await useCase.execute(input);

		// Assert
		expect(result.id).toBeDefined();
		expect(typeof result.id).toBe('string');
		expect(result.id.length).toBeGreaterThan(0);
	});
});
