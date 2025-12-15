import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import TableBody from './table-body.svelte';
import TableBodyWithChildren from './table-body-test-helper.svelte';

describe('TableBody', () => {
	it('should render tbody element with data-slot attribute', async () => {
		// Arrange & Act
		render(TableBody);

		// Assert
		const tbody = page.getByRole('rowgroup');
		await expect.element(tbody).toBeInTheDocument();
		await expect.element(tbody).toHaveAttribute('data-slot', 'table-body');
	});

	it('should apply default CSS classes', async () => {
		// Arrange & Act
		render(TableBody);

		// Assert
		const tbody = page.getByRole('rowgroup');
		await expect.element(tbody).toHaveClass('[&_tr:last-child]:border-0');
	});

	it('should merge custom class names', async () => {
		// Arrange
		const customClass = 'custom-tbody-class';

		// Act
		render(TableBody, { class: customClass });

		// Assert
		const tbody = page.getByRole('rowgroup');
		await expect.element(tbody).toHaveClass('[&_tr:last-child]:border-0');
		await expect.element(tbody).toHaveClass(customClass);
	});

	it('should render children content', async () => {
		// Arrange & Act
		render(TableBodyWithChildren);

		// Assert
		const cell = page.getByText('Test Row Content');
		await expect.element(cell).toBeInTheDocument();
	});

	it('should forward HTML attributes', async () => {
		// Arrange
		const testId = 'test-tbody';

		// Act
		render(TableBody, { 'data-testid': testId });

		// Assert
		const tbody = page.getByTestId(testId);
		await expect.element(tbody).toBeInTheDocument();
	});
});
