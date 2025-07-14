<script lang="ts">
	let places = $state<Record<string, any>[]>([]);

	async function load() {
		const response = await fetch('http://localhost:3000/api/v1/places');
		places = await response.json();
	}

	$effect(() => {
		load();
	});

	$inspect(places);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#each places as place (place.id)}
	<div>
		<h5>{place.name}</h5>
		<p>{place.description}</p>
	</div>
{/each}
