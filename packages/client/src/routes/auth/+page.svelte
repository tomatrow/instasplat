<script lang="ts">
	import { getCurrentUser, type User } from "./auth.remote"
	import Signin from "./Signin.svelte"
	import Signout from "./Signout.svelte"
	import Signup from "./Signup.svelte"

	let message = $state("")
	let currentUser = $state<User>()
	let authMode = $state<"signin" | "signup">("signin")

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

	function handleError(error: unknown) {
		console.error(error)

		if (error instanceof Error) {
			message = error.message
		} else {
			message = "unknown error"
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

{#if currentUser}
	<Signout
		onsignout={() => {
			currentUser = undefined
		}}
		onerror={handleError}
	/>
{:else if authMode === "signin"}
	<Signin
		onsignin={(response) => {
			currentUser = response.user
		}}
		onerror={handleError}
	/>
	<p>
		Don't have an account? <button onclick={() => (authMode = "signup")}>Signup</button>
	</p>
{:else}
	<Signup
		onsignup={(response) => {
			currentUser = response.user
		}}
		onerror={handleError}
	/>
	<p>
		Have an account? <button onclick={() => (authMode = "signin")}>Signin</button>
	</p>
{/if}
