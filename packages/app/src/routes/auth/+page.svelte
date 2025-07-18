<script lang="ts">
	import { login, logout, register, getCurrentUser, type User } from "./auth.remote"

	let email_address = $state("")
	let password = $state("")
	let registerEmail = $state("")
	let registerPassword = $state("")
	let registerPasswordConfirmation = $state("")
	let message = $state("")
	let currentUser = $state<User>()
	let isLoading = $state(false)

	async function loadUser() {
		try {
			const response = await getCurrentUser()
			currentUser = response.user
		} catch (error) {
			console.error(error)
		}
	}

	$effect(() => {
		loadUser()
	})

	async function handleLogin() {
		if (isLoading) return

		isLoading = true
		message = ""

		try {
			const result = await login({ email_address, password })
			message = "Login successful!"
			currentUser = result.user
			console.log("Login result:", result)

			// Clear form
			email_address = ""
			password = ""
		} catch (error) {
			message = `Login failed: ${error instanceof Error ? error.message : "unknown"}`

			console.error("Login error:", error)
		} finally {
			isLoading = false
		}
	}

	async function handleLogout() {
		if (isLoading) return

		isLoading = true
		message = ""

		try {
			await logout()
			message = "Logged out successfully!"
			currentUser = undefined
		} catch (error) {
			message = `Login failed: ${error instanceof Error ? error.message : "unknown"}`
			console.error("Logout error:", error)
		} finally {
			isLoading = false
		}
	}

	async function handleRegister() {
		if (isLoading) return

		isLoading = true
		message = ""

		try {
			const result = await register({
				email_address: registerEmail,
				password: registerPassword,
				password_confirmation: registerPasswordConfirmation
			})
			message = "Registration successful!"
			currentUser = result.user
			console.log("Registration result:", result)

			// Clear form
			registerEmail = ""
			registerPassword = ""
			registerPasswordConfirmation = ""
		} catch (error) {
			message = `Registration failed: ${error instanceof Error ? error.message : "unknown"}`
			console.error("Registration error:", error)
		} finally {
			isLoading = false
		}
	}
</script>

<h1>Authentication Test</h1>

{#if currentUser}
	<div class="user-info">
		<h2>Welcome, {currentUser.email_address}!</h2>
		<p>User ID: {currentUser.id}</p>
	</div>
{/if}

{#if message}
	<div class="message" class:error={message.includes("failed")}>{message}</div>
{/if}

<section>
	<h2>Login with JavaScript</h2>
	<form
		onsubmit={(e) => {
			e.preventDefault()
			handleLogin()
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
			{isLoading ? "Logging in..." : "Login"}
		</button>
	</form>
</section>

<section>
	<h2>Register with JavaScript</h2>
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
				bind:value={registerEmail}
				required
				disabled={isLoading}
			/>
		</div>
		<div>
			<label for="register-password">Password:</label>
			<input
				id="register-password"
				type="password"
				bind:value={registerPassword}
				required
				disabled={isLoading}
			/>
		</div>
		<div>
			<label for="register-password-confirmation">Confirm Password:</label>
			<input
				id="register-password-confirmation"
				type="password"
				bind:value={registerPasswordConfirmation}
				required
				disabled={isLoading}
			/>
		</div>
		<button type="submit" disabled={isLoading}>
			{isLoading ? "Registering..." : "Register"}
		</button>
	</form>
</section>

<section>
	<h2>Logout</h2>
	<button onclick={handleLogout} disabled={isLoading || !currentUser}>
		{isLoading ? "Logging out..." : "Logout"}
	</button>
</section>
