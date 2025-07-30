<script lang="ts">
	import { Canvas } from "@threlte/core"
	import Scene from "./Scene.svelte"
</script>

<header>
	<nav>
		<a href="https://ajcaldwell.dev" target="_blank">ajcaldwell.dev</a>
		<a href="https://github.com/tomatrow/instasplat" target="_blank">github</a>
	</nav>
	<h1>Instasplat</h1>
	<p>It's like instagram, but for splats</p>
</header>

<main>
	<section>
		<svelte:boundary>
			<div>
				<Canvas>
					<Scene url="/splats/bonsai-7k-mini.splat" />
				</Canvas>
			</div>
		</svelte:boundary>
	</section>
</main>

<style>
	div {
		width: 100%;
		max-height: 500px;
		aspect-ratio: 1;
		min-height: 0;
		max-width: 500px;
		margin: auto;
	}
</style>
