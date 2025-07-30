<script lang="ts">
	import { register, type RegistrationResponse } from "./auth.remote"

	let email_address = $state("")
	let password = $state("")
	let password_confirmation = $state("")
	let isLoading = $state(false)

	let {
		onsignup,
		onerror
	}: {
		onsignup?(response: RegistrationResponse): void
		onerror?(error: unknown): void
	} = $props()

	async function handleRegister() {
		if (isLoading) return

		isLoading = true

		try {
			const response = await register({
				email_address,
				password,
				password_confirmation
			})
			onsignup?.(response)

			email_address = ""
			password = ""
			password_confirmation = ""
		} catch (error) {
			onerror?.(error)
		} finally {
			isLoading = false
		}
	}
</script>

<section>
	<h2>Signup</h2>
	<form
		onsubmit={(e) => {
			e.preventDefault()
			handleRegister()
		}}
	>
		<div>
			<label for="register-email">Email:</label>
			<input
				id="register-email"
				type="email"
				bind:value={email_address}
				required
				disabled={isLoading}
			/>
		</div>
		<div>
			<label for="register-password">Password:</label>
			<input
				id="register-password"
				type="password"
				bind:value={password}
				required
				disabled={isLoading}
			/>
		</div>
		<div>
			<label for="register-password-confirmation">Confirm Password:</label>
			<input
				id="register-password-confirmation"
				type="password"
				bind:value={password_confirmation}
				required
				disabled={isLoading}
			/>
		</div>
		<button type="submit" disabled={isLoading}>
			{isLoading ? "Signing up..." : "Signup"}
		</button>
	</form>
</section>
