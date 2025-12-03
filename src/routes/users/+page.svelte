<script lang="ts">
	import { onMount } from 'svelte';
	import * as Table from '$lib/components/ui/table';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';

	interface User {
		id: string;
		email: string;
		name: string;
		createdAt: string;
		updatedAt: string;
	}

	let users = $state<User[]>([]);
	let loading = $state(true);

	// Form states
	let createDialogOpen = $state(false);
	let editDialogOpen = $state(false);
	let deleteDialogOpen = $state(false);

	let formName = $state('');
	let formEmail = $state('');
	let selectedUser = $state<User | null>(null);

	async function fetchUsers() {
		loading = true;
		try {
			const response = await fetch('/api/users');
			if (response.ok) {
				users = await response.json();
			} else {
				toast.error('Failed to fetch users');
			}
		} catch {
			toast.error('Error connecting to server');
		} finally {
			loading = false;
		}
	}

	async function createUser() {
		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: formName, email: formEmail })
			});

			if (response.ok) {
				toast.success('User created successfully');
				createDialogOpen = false;
				resetForm();
				await fetchUsers();
			} else {
				const error = await response.json();
				toast.error(error.message || 'Failed to create user');
			}
		} catch {
			toast.error('Error creating user');
		}
	}

	async function updateUser() {
		if (!selectedUser) return;

		try {
			const response = await fetch(`/api/users/${selectedUser.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: formName, email: formEmail })
			});

			if (response.ok) {
				toast.success('User updated successfully');
				editDialogOpen = false;
				resetForm();
				await fetchUsers();
			} else {
				const error = await response.json();
				toast.error(error.message || 'Failed to update user');
			}
		} catch {
			toast.error('Error updating user');
		}
	}

	async function deleteUser() {
		if (!selectedUser) return;

		try {
			const response = await fetch(`/api/users/${selectedUser.id}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				toast.success('User deleted successfully');
				deleteDialogOpen = false;
				selectedUser = null;
				await fetchUsers();
			} else {
				const error = await response.json();
				toast.error(error.message || 'Failed to delete user');
			}
		} catch {
			toast.error('Error deleting user');
		}
	}

	function openEditDialog(user: User) {
		selectedUser = user;
		formName = user.name;
		formEmail = user.email;
		editDialogOpen = true;
	}

	function openDeleteDialog(user: User) {
		selectedUser = user;
		deleteDialogOpen = true;
	}

	function resetForm() {
		formName = '';
		formEmail = '';
		selectedUser = null;
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	onMount(() => {
		fetchUsers();
	});
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">Users</h1>
			<p class="text-muted-foreground">Manage your users here.</p>
		</div>
		<Dialog.Root bind:open={createDialogOpen}>
			<Dialog.Trigger>
				{#snippet child({ props })}
					<Button {...props}>Add User</Button>
				{/snippet}
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[425px]">
				<Dialog.Header>
					<Dialog.Title>Create User</Dialog.Title>
					<Dialog.Description>Add a new user to the system.</Dialog.Description>
				</Dialog.Header>
				<form
					onsubmit={(e) => {
						e.preventDefault();
						createUser();
					}}
					class="grid gap-4 py-4"
				>
					<div class="grid gap-2">
						<Label for="create-name">Name</Label>
						<Input id="create-name" bind:value={formName} placeholder="John Doe" required />
					</div>
					<div class="grid gap-2">
						<Label for="create-email">Email</Label>
						<Input
							id="create-email"
							type="email"
							bind:value={formEmail}
							placeholder="john@example.com"
							required
						/>
					</div>
					<Dialog.Footer>
						<Button type="submit">Create User</Button>
					</Dialog.Footer>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	</div>

	{#if loading}
		<Card.Root>
			<Card.Content class="py-8">
				<p class="text-muted-foreground text-center">Loading users...</p>
			</Card.Content>
		</Card.Root>
	{:else if users.length === 0}
		<Card.Root>
			<Card.Content class="py-8">
				<p class="text-muted-foreground text-center">No users found. Create one to get started!</p>
			</Card.Content>
		</Card.Root>
	{:else}
		<Card.Root>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Name</Table.Head>
						<Table.Head>Email</Table.Head>
						<Table.Head>Created</Table.Head>
						<Table.Head class="text-end">Actions</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each users as user (user.id)}
						<Table.Row>
							<Table.Cell class="font-medium">{user.name}</Table.Cell>
							<Table.Cell>{user.email}</Table.Cell>
							<Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
							<Table.Cell class="text-end">
								<div class="flex justify-end gap-2">
									<Button variant="outline" size="sm" onclick={() => openEditDialog(user)}>
										Edit
									</Button>
									<Button variant="destructive" size="sm" onclick={() => openDeleteDialog(user)}>
										Delete
									</Button>
								</div>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Root>
	{/if}
</div>

<!-- Edit Dialog -->
<Dialog.Root bind:open={editDialogOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit User</Dialog.Title>
			<Dialog.Description>Update user information.</Dialog.Description>
		</Dialog.Header>
		<form
			onsubmit={(e) => {
				e.preventDefault();
				updateUser();
			}}
			class="grid gap-4 py-4"
		>
			<div class="grid gap-2">
				<Label for="edit-name">Name</Label>
				<Input id="edit-name" bind:value={formName} placeholder="John Doe" required />
			</div>
			<div class="grid gap-2">
				<Label for="edit-email">Email</Label>
				<Input
					id="edit-email"
					type="email"
					bind:value={formEmail}
					placeholder="john@example.com"
					required
				/>
			</div>
			<Dialog.Footer>
				<Button type="submit">Save Changes</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

<!-- Delete Confirmation Dialog -->
<AlertDialog.Root bind:open={deleteDialogOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete the user
				<strong>{selectedUser?.name}</strong> and remove their data from the database.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action onclick={deleteUser}>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
