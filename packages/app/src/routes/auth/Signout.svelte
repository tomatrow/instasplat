<script lang="ts">
	import { logout } from "./auth.remote"

	let isLoading = $state(false)

	let {
		onsignout,
		onerror
	}: {
		onsignout?(): void
		onerror?(error: unknown): void
	} = $props()

	async function handleSignout() {
		if (isLoading) return

		isLoading = true

		try {
			await logout()
			onsignout?.()
		} catch (error) {
			onerror?.(error)
		} finally {
			isLoading = false
		}
	}
</script>

<section>
	<h2>Logout</h2>
	<button onclick={handleSignout} disabled={isLoading}>
		{isLoading ? "Signing out..." : "Signout"}
	</button>
</section>
