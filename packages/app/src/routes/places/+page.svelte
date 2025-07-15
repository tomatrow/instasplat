<script lang="ts">
	import { getPlaces, addPlaceForm, deletePlace } from "./places.remote"

	let places = $derived(getPlaces())
	let dialog: HTMLDialogElement
</script>

<h2>Places</h2>

{#each await places as place (place.id)}
	<div>
		<h3>{place.name}</h3>
		<p>{place.description}</p>
		<p>{place.address}</p>
		<button onclick={() => deletePlace(place.id)}>Delete</button>
	</div>
{/each}

<button onclick={() => dialog.show()}>Add Place</button>

<dialog bind:this={dialog}>
	<form {...addPlaceForm}>
		<input name="name" placeholder="Place name" required />
		<input name="address" placeholder="Address" required />
		<input name="latitude" placeholder="Latitude" type="number" step="any" required />
		<input name="longitude" placeholder="Longitude" type="number" step="any" required />
		<textarea name="description" placeholder="Description" required></textarea>
		<input name="phone" placeholder="Phone" />
		<input name="website" placeholder="Website" type="url" />
		<input name="hours" placeholder="Hours" />

		<button type="button" onclick={() => dialog.close()}>Cancel</button>
		<button type="submit">Add Place</button>
	</form>
</dialog>
