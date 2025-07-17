import { command, form } from "$app/server"
import { PUBLIC_API_BASE_URL } from "$env/static/public"

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

export const login = command("unchecked", async (credentials: LoginCredentials) => {
	const response = await fetch(`${PUBLIC_API_BASE_URL}/session`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify(credentials),
		credentials: "include"
	})

	const json: LoginResponse = await response.json()

	if (!response.ok) {
		throw new Error(json.error || `Login failed: ${response.statusText}`)
	}

	return json
})

export const register = command("unchecked", async (credentials: RegistrationCredentials) => {
	const response = await fetch(`${PUBLIC_API_BASE_URL}/registration`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({ user: credentials }),
		credentials: "include"
	})

	const json: RegistrationResponse = await response.json()

	if (!response.ok) {
		throw new Error(json.errors?.join(", ") || `Registration failed: ${response.statusText}`)
	}

	return json
})

export const registerForm = form(async (form) => {
	const credentials = {
		email_address: form.get("email_address") as string,
		password: form.get("password") as string,
		password_confirmation: form.get("password_confirmation") as string
	} satisfies RegistrationCredentials

	const response = await fetch(`${PUBLIC_API_BASE_URL}/registration`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({ user: credentials }),
		credentials: "include"
	})

	const json: RegistrationResponse = await response.json()

	if (!response.ok) {
		throw new Error(json.errors?.join(", ") || `Registration failed: ${response.statusText}`)
	}

	return json
})

export const logout = command(async () => {
	const response = await fetch(`${PUBLIC_API_BASE_URL}/session`, {
		method: "DELETE",
		headers: {
			Accept: "application/json"
		},
		credentials: "include"
	})

	if (!response.ok) {
		throw new Error(`Logout failed: ${response.statusText}`)
	}

	const json = await response.json()
	return json
})

export const loginForm = form(async (form) => {
	const credentials = {
		email_address: form.get("email_address") as string,
		password: form.get("password") as string
	} satisfies LoginCredentials

	const response = await fetch(`${PUBLIC_API_BASE_URL}/session`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify(credentials),
		credentials: "include"
	})

	const text = await response.text()

	console.log(text)

	const json: LoginResponse = JSON.parse(text)

	console.log(JSON.stringify(json, null, 2))

	if (!response.ok) {
		throw new Error(json.error || `Login failed: ${response.statusText}`)
	}

	return json
})
