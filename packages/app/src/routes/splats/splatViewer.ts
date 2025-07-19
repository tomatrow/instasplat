export function splatViewer(url: string) {
	async function view(root: HTMLElement) {
		const { Reall3dViewer } = await import("@reall3d/reall3dviewer")
		const viewer = new Reall3dViewer({ root })
		viewer.addModel(url)
	}

	return (element: HTMLElement) => {
		view(element)
	}
}
