<script lang="ts">
	export let appName: string = 'Your App';
	export let year: number = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-left">
				<p>&copy; {year} {appName}. All rights reserved.</p>
			</div>
			<div class="footer-right">
				<div class="footer-links">
					<a href="/privacy">Privacy Policy</a>
					<a href="/terms">Terms of Service</a>
					<a href="/contact">Contact</a>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		background-color: #f8f9fa;
		border-top: 1px solid #e9ecef;
		margin-top: auto;
		padding: 2rem 0;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.footer-left p {
		margin: 0;
		color: #6c757d;
		font-size: 0.875rem;
	}

	.footer-links {
		display: flex;
		gap: 1rem;
	}

	.footer-links a {
		color: #6c757d;
		text-decoration: none;
		font-size: 0.875rem;
		transition: color 0.2s;
	}

	.footer-links a:hover {
		color: #007bff;
	}

	@media (max-width: 768px) {
		.footer-content {
			flex-direction: column;
			text-align: center;
		}
	}
</style>