<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner';
	import { Button } from '$lib/components/ui/button';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="bg-background text-foreground min-h-screen">
	<header class="border-border border-b">
		<nav class="container mx-auto flex items-center gap-4 px-4 py-3">
			<Button variant="link" href="/" class="p-0 text-xl font-bold">SvelteKit Demo</Button>
			<div class="flex gap-2">
				<Button variant="ghost" href="/">Home</Button>
				<Button variant="ghost" href="/users">Users</Button>
			</div>
		</nav>
	</header>

	<main class="container mx-auto px-4 py-8">
		{@render children()}
	</main>
</div>

<Toaster richColors />
