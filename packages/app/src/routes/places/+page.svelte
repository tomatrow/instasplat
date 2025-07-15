<script lang="ts">
	import { getPlaces, addPlaceForm, deletePlace } from "./places.remote"

	let places = $derived(getPlaces())
	let dialog: HTMLDialogElement
</script>

<h1>Places</h1>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Address</th>
			<th>Description</th>
			<th>Phone</th>
			<th>Website</th>
			<th>Hours</th>
			<th>Coordinates</th>
			<th><button onclick={() => dialog.show()}>Add Place</button></th>
		</tr>
	</thead>
	<tbody>
		{#each await places as place (place.id)}
			<tr>
				<td>{place.name}</td>
				<td>{place.address}</td>
				<td>{place.description}</td>
				<td>{place.phone}</td>
				<td>
					{#if place.website}
						<a href={place.website} target="_blank">site</a>
					{/if}
				</td>
				<td>{place.hours}</td>
				<td>
					{#if place.latitude && place.longitude}
						{place.latitude}, {place.longitude}
					{/if}
				</td>
				<td><button onclick={() => deletePlace(place.id)}>Delete</button> </td>
			</tr>
		{/each}
	</tbody>
</table>

<dialog bind:this={dialog}>
	<h2>New Place</h2>
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
