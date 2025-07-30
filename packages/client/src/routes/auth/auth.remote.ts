import { command, getRequestEvent } from "$app/server"

export interface LoginCredentials {
	email_address: string
	password: string
}

export interface RegistrationCredentials {
	email_address: string
	password: string
	password_confirmation: string
}

export interface User {
	id: number
	email_address: string
}

export interface LoginResponse {
	success: boolean
	user?: User
	error?: string
}

export interface RegistrationResponse {
	success: boolean
	user?: User
	errors?: string[]
}

export const register = command("unchecked", async (credentials: RegistrationCredentials) => {
	const { fetch } = getRequestEvent()

	const response = await fetch(`/api/user`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({ user: credentials }),
		credentials: "include"
	})

	const json: RegistrationResponse = await response.json()

	if (!response.ok)
		throw new Error(json.errors?.join(", ") || `Registration failed: ${response.statusText}`)

	return json
})

export const login = command("unchecked", async (credentials: LoginCredentials) => {
	const { fetch } = getRequestEvent()

	const response = await fetch(`/api/session`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(credentials),
		credentials: "include"
	})

	const headers = [...response.headers.entries()]
	console.log({
		headers
	})

	const json: LoginResponse = await response.json()

	if (!response.ok) throw new Error(json.error || `Login failed: ${response.statusText}`)

	return json
})

export const getCurrentUser = command(async () => {
	const { fetch, cookies } = getRequestEvent()

	console.log({
		cookies: cookies.getAll()
	})

	const response = await fetch(`/api/session`, {
		method: "GET",
		headers: { Accept: "application/json" },
		credentials: "include"
	})

	const json: LoginResponse = await response.json()

	if (!response.ok)
		throw new Error(json.error || `Failed to get current user: ${response.statusText}`)

	return json
})

export const logout = command(async () => {
	const { fetch } = getRequestEvent()

	const response = await fetch(`/api/session`, {
		method: "DELETE",
		headers: { Accept: "application/json" },
		credentials: "include"
	})

	if (!response.ok) throw new Error(`Logout failed: ${response.statusText}`)

	const json = await response.json()
	return json
})
