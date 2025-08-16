<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { getAuthMessage } from '$lib/utils/auth';

	export let form: { error?: string } | null = null;

	let loading = false;
	
	$: redirectMessage = getAuthMessage($page.url);
</script>

<svelte:head>
	<title>Login - Your App</title>
</svelte:head>

<div class="login-wrapper">
	<div class="login-box">
		<h2 class="logo"><a href="/">YOUR APP<span>.</span></a></h2>
		<h2 class="login-title-primary">Welcome back!</h2>
		<h4 class="login-title-secondary">Enter your credentials to continue.</h4>

		{#if redirectMessage}
			<div class="alert alert-info">{redirectMessage}</div>
		{/if}

		{#if form?.error}
			<div class="alert alert-danger">{form.error}</div>
		{/if}

		<form
			method="POST"
			action="?/login"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
		>
			<div class="form-group">
				<label for="email">Email Address</label>
				<input
					type="email"
					id="email"
					name="email"
					class="form-control"
					placeholder="Enter your email"
					required
				/>
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					class="form-control"
					placeholder="Enter your password"
					required
				/>
			</div>

			<button
				type="submit"
				class="btn btn-primary btn-block btn-login"
				disabled={loading}
			>
				{loading ? 'Please wait...' : 'Sign In'}
			</button>
		</form>

		<p class="text-center mt-3">
			Don't have an account? <a href="/register">Sign up here</a>
		</p>
	</div>
</div>

<style>
	.login-wrapper {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 1rem;
	}

	.login-box {
		background: white;
		padding: 3rem;
		border-radius: 1rem;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
		width: 100%;
		max-width: 400px;
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

	.login-title-primary {
		font-size: 1.75rem;
		font-weight: 600;
		color: #333;
		margin: 1.5rem 0 0.5rem;
	}

	.login-title-secondary {
		font-size: 1rem;
		color: #6c757d;
		margin-bottom: 2rem;
		font-weight: normal;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: #333;
	}

	.form-control {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 0.5rem;
		font-size: 1rem;
		transition: border-color 0.2s;
	}

	.form-control:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
	}

	.btn-login {
		width: 100%;
		padding: 0.75rem;
		font-size: 1rem;
		font-weight: 500;
		border-radius: 0.5rem;
		border: none;
		background: #007bff;
		color: white;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.btn-login:hover:not(:disabled) {
		background: #0056b3;
	}

	.btn-login:disabled {
		background: #6c757d;
		cursor: not-allowed;
	}

	.alert {
		padding: 0.75rem;
		margin-bottom: 1rem;
		border-radius: 0.375rem;
	}

	.alert-danger {
		background-color: #f8d7da;
		border: 1px solid #f5c6cb;
		color: #721c24;
	}

	.text-center {
		text-align: center;
	}

	.mt-3 {
		margin-top: 1rem;
	}

	p a {
		color: #007bff;
		text-decoration: none;
	}

	p a:hover {
		text-decoration: underline;
	}
</style>