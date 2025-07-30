<script lang="ts">
	import { T } from "@threlte/core"
	import { OrbitControls } from "@threlte/extras"
	import { DEG2RAD } from "three/src/math/MathUtils.js"
	import { Splat } from "$lib"

	let { url }: { url: string } = $props()

	let alphaHash = false
	let alphaTest = 0.06
	let toneMapped = true
</script>

<Splat
	rotation={[0 * DEG2RAD, -70 * DEG2RAD, -10 * DEG2RAD]}
	src={url}
	{alphaHash}
	alphaTest={alphaTest > 0 ? alphaTest : undefined}
	{toneMapped}
/>

<T.PerspectiveCamera
	makeDefault
	position={[3, 3, 3]}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
	fov={25}
>
	<OrbitControls />
</T.PerspectiveCamera>
