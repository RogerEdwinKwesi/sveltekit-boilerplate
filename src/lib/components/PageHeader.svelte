<script lang="ts">
	import { User } from '@lucide/svelte';
	import type { UserData } from '../types.js';

	export let user: UserData | null = null;
	export let title: string = 'Your App';

	function handleLogout() {
		const form = document.getElementById('logout-form') as HTMLFormElement;
		form?.submit();
	}
</script>

<div class="header">
	<div class="container">
		<div class="header-left">
			<h2 class="logo"><a href="/dashboard">{title}<span>.</span></a></h2>
		</div>
		<div class="header-right">
			{#if user}
				<div class="dropdown dropdown-c">
					<a href="#" class="logged-user" data-toggle="dropdown">
						<User />
						<span>{user.firstName || 'User'}</span>
						<i class="fa-solid fa-angle-down"></i>
					</a>
					<div class="dropdown-menu dropdown-menu-right">
						<nav class="nav">
							<a href="/profile" class="nav-link">
								<i class="fa-solid fa-user me-2"></i> Profile
							</a>
							<button type="button" on:click={handleLogout} class="nav-link border-0 bg-transparent">
								<i class="fa-solid fa-right-from-bracket me-2"></i> Sign Out
							</button>
						</nav>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- Hidden logout form -->
<form id="logout-form" method="POST" action="/logout" style="display: none;">
	<button type="submit">Logout</button>
</form>

<style>
	.header {
		background: #fff;
		border-bottom: 1px solid #e9ecef;
		padding: 1rem 0;
	}

	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.logo a {
		font-size: 1.5rem;
		font-weight: bold;
		text-decoration: none;
		color: #333;
	}

	.logo span {
		color: #007bff;
	}

	.logged-user {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: #333;
		padding: 0.5rem;
		border-radius: 0.375rem;
		transition: background-color 0.2s;
	}

	.logged-user:hover {
		background-color: #f8f9fa;
	}

	.dropdown {
		position: relative;
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		right: 0;
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 0.375rem;
		box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
		min-width: 160px;
		z-index: 1000;
		display: none;
	}

	.dropdown:hover .dropdown-menu {
		display: block;
	}

	.nav-link {
		display: block;
		padding: 0.5rem 1rem;
		text-decoration: none;
		color: #333;
		width: 100%;
		text-align: left;
		border: none;
		background: none;
		cursor: pointer;
	}

	.nav-link:hover {
		background-color: #f8f9fa;
	}
</style>