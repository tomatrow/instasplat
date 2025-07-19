let promise: Promise<any>
function loadLibrary() {
	return (promise ??= import("@reall3d/reall3dviewer"))
}

export function splatViewer(url: string) {
	async function view(root: HTMLElement) {
		const { Reall3dViewer } = await loadLibrary()
		const viewer = new Reall3dViewer({ root })
		viewer.addModel(url)
	}

	return (element: HTMLElement) => {
		view(element)
	}
}
