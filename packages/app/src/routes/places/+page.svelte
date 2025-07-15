<script lang="ts">
	import { getPlaces } from "./places.remote"

	let places = $derived(await getPlaces())
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#each places as place (place.id)}
	<div>
		<h5>{place.name}</h5>
		<p>{place.description}</p>
	</div>
{/each}
