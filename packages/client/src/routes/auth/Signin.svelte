<script lang="ts">
	import { login, type LoginResponse } from "./auth.remote"

	let {
		onsignin,
		onerror
	}: {
		onsignin?(response: LoginResponse): void
		onerror?(error: unknown): void
	} = $props()

	let email_address = $state("")
	let password = $state("")
	let isLoading = $state(false)

	async function handleSignin() {
		if (isLoading) return

		isLoading = true

		try {
			const response = await login({ email_address, password })
			onsignin?.(response)

			email_address = ""
			password = ""
		} catch (error) {
			onerror?.(error)
		} finally {
			isLoading = false
		}
	}
</script>

<section>
	<h2>Signin</h2>
	<form
		onsubmit={(event) => {
			event.preventDefault()
			handleSignin()
		}}
	>
		<div>
			<label for="email">Email:</label>
			<input id="email" type="email" bind:value={email_address} required disabled={isLoading} />
		</div>
		<div>
			<label for="password">Password:</label>
			<input id="password" type="password" bind:value={password} required disabled={isLoading} />
		</div>
		<button type="submit" disabled={isLoading}>
			{isLoading ? "Signing in..." : "Signin"}
		</button>
	</form>
</section>
