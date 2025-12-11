import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import TableBody from './table-body.svelte';

describe('TableBody', () => {
	it('should render as tbody element', async () => {
		// Arrange & Act
		const { container } = render(TableBody);

		// Assert
		const tbody = container.querySelector('tbody');
		await expect.element(tbody).toBeInTheDocument();
	});

	it('should apply data-slot attribute', async () => {
		// Arrange & Act
		const { container } = render(TableBody);

		// Assert
		const tbody = container.querySelector('tbody');
		await expect.element(tbody).toHaveAttribute('data-slot', 'table-body');
	});

	it('should apply default class for last row border', async () => {
		// Arrange & Act
		const { container } = render(TableBody);

		// Assert
		const tbody = container.querySelector('tbody');
		await expect.element(tbody).toHaveClass('[&_tr:last-child]:border-0');
	});

	it('should apply custom classes', async () => {
		// Arrange
		const customClass = 'custom-table-body';

		// Act
		const { container } = render(TableBody, {
			class: customClass
		});

		// Assert
		const tbody = container.querySelector('tbody');
		await expect.element(tbody).toHaveClass(customClass);
		await expect.element(tbody).toHaveClass('[&_tr:last-child]:border-0');
	});

	it('should pass through additional HTML attributes', async () => {
		// Arrange
		const testId = 'test-tbody';

		// Act
		const { container } = render(TableBody, {
			'data-testid': testId
		});

		// Assert
		const tbody = container.querySelector('tbody');
		await expect.element(tbody).toHaveAttribute('data-testid', testId);
	});
});
