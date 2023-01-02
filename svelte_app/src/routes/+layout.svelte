<script>
	import Header from './Header.svelte';
	import "../app.css";
	import './styles.css';
</script>

<div class="dark:bg-gray-900">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>

</style>
