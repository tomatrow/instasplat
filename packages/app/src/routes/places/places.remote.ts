import { PUBLIC_API_BASE_URL } from "$env/static/public"
import { query, prerender, command, getRequestEvent } from "$app/server"

interface PlaceData {
	name?: string | null
	address?: string | null
	/** decimal string */
	latitude?: string | null
	/** decimal string */
	longitude?: string | null
	description?: string | null
	phone?: string | null
	website?: string | null
	hours?: string | null
	/** ISO 8601 string */
	created_at: string
	/** ISO 8601 string */
	updated_at: string
}

interface Place extends PlaceData {
	id: number
}

export const getPlaces = query(async () => {
	console.log("get_places")
	const response = await fetch(`${PUBLIC_API_BASE_URL}/places`)
	if (!response.ok) {
		throw new Error(`Failed to fetch places: ${response.statusText}`)
	}

	const places: Place[] = await response.json()

	return places
})

export const deletePlace = command("unchecked", async (id: number) => {
	console.log("delete_place", id)
	const response = await fetch(`${PUBLIC_API_BASE_URL}/places/${id}`, {
		method: "DELETE"
	})

	if (!response.ok) {
		throw new Error(`Failed to delete place: ${response.statusText}`)
	}

	// Rails typically returns 204 No Content for successful deletes,
	// so we might not have JSON to parse
	if (response.status === 204) {
		return { success: true }
	}

	return await response.json()
})

export const getPlacesPrerendered = prerender(async () => {
	console.log("get_places prerendered")
	const response = await fetch(`${PUBLIC_API_BASE_URL}/places`)
	if (!response.ok) {
		throw new Error(`Failed to fetch places: ${response.statusText}`)
	}

	const places: Place[] = await response.json()

	return places
})

export const getPlace = query("unchecked", async (id: number) => {
	console.log("get_place", id)
	const response = await fetch(`${PUBLIC_API_BASE_URL}/places/${id}`)
	if (!response.ok) {
		throw new Error(`Failed to fetch place: ${response.statusText}`)
	}

	const place: Place = await response.json()

	return place
})

export const addPlace = command("unchecked", async (placeData: PlaceData) => {
	const event = getRequestEvent()
	console.log("add_place", event.isRemoteRequest)

	const response = await fetch(`${PUBLIC_API_BASE_URL}/places`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ place: placeData })
	})

	if (!response.ok) {
		throw new Error(`Failed to create place: ${response.statusText}`)
	}

	return await response.json()
})
