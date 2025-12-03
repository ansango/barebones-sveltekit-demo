<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex flex-col items-center gap-8">
	<h1 class="text-4xl font-bold">Welcome to SvelteKit</h1>
	<p class="text-muted-foreground">
		A demo application with a User CRUD following DDD architecture.
	</p>

	<Card.Root class="w-full max-w-md">
		<Card.Header>
			<Card.Title>User Management</Card.Title>
			<Card.Description
				>Create, read, update, and delete users with SQLite storage.</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<p class="text-muted-foreground text-sm">
				This application demonstrates a complete CRUD implementation using:
			</p>
			<ul class="text-muted-foreground mt-2 list-inside list-disc text-sm">
				<li>Domain-Driven Design (DDD) architecture</li>
				<li>SQLite database with Bun runtime</li>
				<li>SvelteKit API routes</li>
				<li>shadcn-ui-svelte components</li>
			</ul>
		</Card.Content>
		<Card.Footer>
			<Button href="/users" class="w-full">Manage Users</Button>
		</Card.Footer>
	</Card.Root>
</div>
