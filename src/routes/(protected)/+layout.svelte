<script lang="ts">
	import { onMount } from 'svelte';
	import { navigating } from '$app/stores';
	import { LayoutDashboard, User, LoaderCircle } from '@lucide/svelte';
	import PageFooter from '../../lib/components/PageFooter.svelte';
	import { auth, isAuthenticated } from '../../lib/stores/auth';
	import type { UserData } from '../../lib/types.js';

	export let data: {
		pathname: string;
		user: UserData | null;
	};

	// Initialize auth store with server data
	$: auth.setUser(data.user);

	function isActive(path: string, current: string): boolean {
		return current === path || current.startsWith(path + '/');
	}

	function handleLogout() {
		auth.logout();
		const form = document.getElementById('logout-form') as HTMLFormElement;
		form?.submit();
	}
</script>

<div class="app-header">
	<div class="container">
		<div class="header-left">
			<h2 class="app-logo"><a href="/dashboard">YOUR APP<span>.</span></a></h2>
		</div>
		<div class="header-right">
			<div class="dropdown dropdown-c">
				<a href="#" class="logged-user" data-toggle="dropdown">
					<User />
					<span>{data.user?.firstName || 'User'}</span>
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
		</div>
	</div>
</div>

<nav class="app-navbar">
	<div class="container">
		<ul class="nav">
			<li class="nav-item {isActive('/dashboard', data.pathname) ? 'active' : ''}">
				<a class="nav-link" href="/dashboard">
					<LayoutDashboard class="me-2" />
					<span>Dashboard</span>
				</a>
			</li>

			<li class="nav-item {isActive('/profile', data.pathname) ? 'active' : ''}">
				<a class="nav-link" href="/profile">
					<User class="me-2" />
					<span>Profile</span>
				</a>
			</li>
		</ul>
	</div>
</nav>

<!-- Loading indicator -->
{#if $navigating}
	<div class="loading-overlay">
		<div class="loading-spinner">
			<LoaderCircle size="32" class="animate-spin" />
			<span>Loading...</span>
		</div>
	</div>
{/if}

<!-- Hidden logout form -->
<form id="logout-form" method="POST" action="/logout" style="display: none;">
	<button type="submit">Logout</button>
</form>

<main class="main-content">
	<slot />
</main>

<PageFooter appName="Your App" />

<style>
	.app-header {
		background: #fff;
		border-bottom: 1px solid #e9ecef;
		padding: 1rem 0;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.app-logo a {
		font-size: 1.5rem;
		font-weight: bold;
		text-decoration: none;
		color: #333;
	}

	.app-logo span {
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

	.app-navbar {
		background: #f8f9fa;
		border-bottom: 1px solid #e9ecef;
	}

	.app-navbar .nav {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-item {
		border-bottom: 3px solid transparent;
	}

	.nav-item.active {
		border-bottom-color: #007bff;
	}

	.nav-item .nav-link {
		display: flex;
		align-items: center;
		padding: 1rem;
		text-decoration: none;
		color: #333;
		transition: color 0.2s;
	}

	.nav-item .nav-link:hover {
		color: #007bff;
		background: none;
	}

	.nav-item.active .nav-link {
		color: #007bff;
	}

	.main-content {
		min-height: calc(100vh - 200px);
		padding: 2rem 0;
	}

	.loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		backdrop-filter: blur(2px);
	}

	.loading-spinner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 24px;
		border-radius: 8px;
	}

	.loading-spinner span {
		color: #6b7280;
		font-weight: 500;
		font-size: 14px;
	}

	:global(.animate-spin) {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.me-2 {
		margin-right: 0.5rem;
	}
</style>