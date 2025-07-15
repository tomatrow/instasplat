import { query, prerender, command, form } from "$app/server"
import { PUBLIC_API_BASE_URL } from "$env/static/public"

export interface PlaceData {
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
}

export interface Place extends PlaceData {
	id: number
	/** ISO 8601 string */
	created_at: string
	/** ISO 8601 string */
	updated_at: string
}

export const getPlaces = query(async () => {
	const response = await fetch(`${PUBLIC_API_BASE_URL}/places`)
	if (!response.ok) throw new Error(`Failed to fetch places: ${response.statusText}`)

	const places: Place[] = await response.json()

	return places
})

export const deletePlace = command("unchecked", async (id: number) => {
	const response = await fetch(`${PUBLIC_API_BASE_URL}/places/${id}`, { method: "DELETE" })
	if (!response.ok) throw new Error(`Failed to delete place: ${response.statusText}`)

	// Rails typically returns 204 No Content for successful deletes,
	// so we might not have JSON to parse
	if (response.status === 204) return { success: true }

	const json = await response.json()

	console.log({ json })

	return json
})

export const getPlacesPrerendered = prerender(async () => {
	const response = await fetch(`${PUBLIC_API_BASE_URL}/places`)
	if (!response.ok) throw new Error(`Failed to fetch places: ${response.statusText}`)

	const places: Place[] = await response.json()

	return places
})

export const getPlace = query("unchecked", async (id: number) => {
	const response = await fetch(`${PUBLIC_API_BASE_URL}/places/${id}`)
	if (!response.ok) throw new Error(`Failed to fetch place: ${response.statusText}`)

	const place: Place = await response.json()

	return place
})

export const addPlace = command("unchecked", async (placeData: PlaceData) => {
	const response = await fetch(`${PUBLIC_API_BASE_URL}/places`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ place: placeData })
	})
	if (!response.ok) throw new Error(`Failed to create place: ${response.statusText}`)

	const json = await response.json()

	console.log({ json })

	return json
})

export const addPlaceForm = form(async (form) => {
	const place = {
		name: form.get("name") as string,
		address: form.get("address") as string,
		description: form.get("description") as string,
		phone: form.get("phone") as string,
		website: form.get("website") as string,
		hours: form.get("hours") as string,
		latitude: form.get("latitude") as string,
		longitude: form.get("longitude") as string
	} satisfies PlaceData

	const response = await fetch(`${PUBLIC_API_BASE_URL}/places`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ place })
	})
	if (!response.ok) throw new Error(`Failed to create place: ${response.statusText}`)

	return "returned something from server"
})
