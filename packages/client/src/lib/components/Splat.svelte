<svelte:options runes={true} />

<script lang="ts">
	import type { Snippet } from "svelte"
	import { Splat, SplatLoader } from "@pmndrs/vanilla"
	import { T, useLoader, useThrelte, useTask } from "@threlte/core"

	let {
		src,
		alphaHash = false,
		alphaTest = undefined,
		toneMapped = undefined,
		children,
		...rest
	}: {
		src: string
		alphaHash?: boolean
		alphaTest?: number | undefined
		toneMapped?: boolean | undefined
		children?: Snippet<[{ ref: typeof Splat }]>
		[key: string]: any
	} = $props()

	const { renderer, camera } = useThrelte()
	const loader = useLoader(SplatLoader, { args: [renderer] })

	const splat = $derived.by(() => {
		console.log({ src })
		const promise = loader.load(src)
		console.log({ promise })
		return promise
	})

	let framesRendered = 0
	const { start, stop } = useTask(
		() => {
			framesRendered++
			if (framesRendered >= 10) {
				stop()
				framesRendered = 0
			}
		},
		{ autoStart: false }
	)
</script>

{#await splat then splat}
	{console.log({ splat })}
	<T
		{...rest}
		dispose={false}
		is={Splat}
		args={[splat, $camera, { alphaHash, alphaTest, toneMapped }]}
		oncreate={start}
	>
		{@render children?.({ ref: Splat })}
	</T>
{/await}
