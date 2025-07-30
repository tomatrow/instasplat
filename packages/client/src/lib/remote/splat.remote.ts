import path from "node:path"
import { readdir } from "node:fs/promises"
import { writeFile } from "node:fs/promises"
import { exec } from "node:child_process"
import { promisify } from "node:util"
import * as v from "valibot"
import { command, query } from "$app/server"

const execAsync = promisify(exec)

export const listSplats = query(async () => {
	try {
		const files = await readdir("./static/splats")

		const splatFiles = files
			.filter((file) => file.endsWith(".splat"))
			.map((file) => `/splats/${file}`)

		return splatFiles
	} catch (error) {
		console.error(error)
	}
})

export const importSplat = command(v.string(), async (shareUrlString) => {
	const id = shareUrlString.replace("https://scaniverse.com/scan/", "").trim()
	const targetUrl = `https://scaniverse.com/api/media/${id}/gaussians.spz`

	const response = await fetch(targetUrl)

	if (!response.ok)
		throw new Error(`Failed to fetch SPZ data: ${response.status} ${response.statusText}`)

	const spzPath = path.join("static/splats", `${id}.spz`)
	const splatPath = path.join("static/splats", `${id}.splat`)

	const spzData = await response.arrayBuffer()
	await writeFile(spzPath, new Uint8Array(spzData))
	await execAsync(`./scripts/gsbox spz2splat -i ${spzPath} -o ${splatPath}`)

	await listSplats().refresh()

	return { success: true, id, spzPath, splatPath }
})
