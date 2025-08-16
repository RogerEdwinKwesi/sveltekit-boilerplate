<script lang="ts">
	import type { UserData } from '$lib/types';
	
	export let data: { user: UserData };
</script>

<svelte:head>
	<title>Dashboard - Your App</title>
</svelte:head>

<div class="container">
	<div class="page-header">
		<h1>Dashboard</h1>
		<p class="text-muted">Welcome back, {data.user.firstName}!</p>
	</div>

	<div class="row">
		<div class="col-md-4">
			<div class="card stat-card">
				<div class="card-body">
					<div class="stat-icon">
						<i class="fa-solid fa-users"></i>
					</div>
					<div class="stat-content">
						<h3>150</h3>
						<p>Total Users</p>
					</div>
				</div>
			</div>
		</div>

		<div class="col-md-4">
			<div class="card stat-card">
				<div class="card-body">
					<div class="stat-icon">
						<i class="fa-solid fa-chart-line"></i>
					</div>
					<div class="stat-content">
						<h3>2,340</h3>
						<p>Page Views</p>
					</div>
				</div>
			</div>
		</div>

		<div class="col-md-4">
			<div class="card stat-card">
				<div class="card-body">
					<div class="stat-icon">
						<i class="fa-solid fa-dollar-sign"></i>
					</div>
					<div class="stat-content">
						<h3>$12,450</h3>
						<p>Revenue</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="row mt-4">
		<div class="col-md-8">
			<div class="card">
				<div class="card-header">
					<h5 class="card-title">Recent Activity</h5>
				</div>
				<div class="card-body">
					<div class="activity-item">
						<div class="activity-icon">
							<i class="fa-solid fa-user-plus text-success"></i>
						</div>
						<div class="activity-content">
							<p><strong>New user registered</strong></p>
							<small class="text-muted">2 minutes ago</small>
						</div>
					</div>
					
					<div class="activity-item">
						<div class="activity-icon">
							<i class="fa-solid fa-file-text text-primary"></i>
						</div>
						<div class="activity-content">
							<p><strong>New report generated</strong></p>
							<small class="text-muted">15 minutes ago</small>
						</div>
					</div>
					
					<div class="activity-item">
						<div class="activity-icon">
							<i class="fa-solid fa-envelope text-warning"></i>
						</div>
						<div class="activity-content">
							<p><strong>Email campaign sent</strong></p>
							<small class="text-muted">1 hour ago</small>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-md-4">
			<div class="card">
				<div class="card-header">
					<h5 class="card-title">Quick Actions</h5>
				</div>
				<div class="card-body">
					<div class="d-grid gap-2">
						<button class="btn btn-primary" type="button">
							<i class="fa-solid fa-plus me-2"></i>Add New Item
						</button>
						<button class="btn btn-outline-secondary" type="button">
							<i class="fa-solid fa-download me-2"></i>Export Data
						</button>
						<button class="btn btn-outline-info" type="button">
							<i class="fa-solid fa-chart-bar me-2"></i>View Reports
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.page-header {
		margin-bottom: 2rem;
	}

	.page-header h1 {
		margin-bottom: 0.5rem;
		color: #333;
	}

	.text-muted {
		color: #6c757d;
	}

	.row {
		margin-left: -0.75rem;
		margin-right: -0.75rem;
	}

	.col-md-4, .col-md-8 {
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		margin-bottom: 1.5rem;
	}

	@media (min-width: 768px) {
		.col-md-4 { width: 33.333333%; }
		.col-md-8 { width: 66.666667%; }
	}

	.card {
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 0.5rem;
		box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
	}

	.card-header {
		padding: 1rem;
		border-bottom: 1px solid #e9ecef;
		background-color: #f8f9fa;
	}

	.card-body {
		padding: 1rem;
	}

	.card-title {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.stat-card .card-body {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.stat-icon {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: #007bff;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 1.5rem;
	}

	.stat-content h3 {
		margin: 0;
		font-size: 2rem;
		font-weight: bold;
		color: #333;
	}

	.stat-content p {
		margin: 0;
		color: #6c757d;
		font-size: 0.9rem;
	}

	.activity-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid #f1f1f1;
	}

	.activity-item:last-child {
		border-bottom: none;
	}

	.activity-icon {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #f8f9fa;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.activity-content p {
		margin: 0;
		font-size: 0.9rem;
	}

	.activity-content small {
		font-size: 0.8rem;
	}

	.d-grid {
		display: grid;
	}

	.gap-2 {
		gap: 0.5rem;
	}

	.btn {
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		border: 1px solid transparent;
		text-decoration: none;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.btn-primary {
		background: #007bff;
		border-color: #007bff;
		color: white;
	}

	.btn-primary:hover {
		background: #0056b3;
		border-color: #0056b3;
	}

	.btn-outline-secondary {
		color: #6c757d;
		border-color: #6c757d;
		background: transparent;
	}

	.btn-outline-secondary:hover {
		background: #6c757d;
		color: white;
	}

	.btn-outline-info {
		color: #17a2b8;
		border-color: #17a2b8;
		background: transparent;
	}

	.btn-outline-info:hover {
		background: #17a2b8;
		color: white;
	}

	.me-2 {
		margin-right: 0.5rem;
	}

	.mt-4 {
		margin-top: 1.5rem;
	}

	.text-success { color: #28a745; }
	.text-primary { color: #007bff; }
	.text-warning { color: #ffc107; }
</style>