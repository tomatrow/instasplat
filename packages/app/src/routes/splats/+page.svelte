<script lang="ts">
	import { splatViewer } from "./splatViewer"

	interface InstasplatPost {
		id: number
		user_id: number
		title: string
		description?: string
		splat_file_url: string
		view_count: number
		like_count: number
		comment_count: number
		tags: string[]
		location?: {
			name: string
			latitude: number
			longitude: number
		}
		created_at: string // ISO 8601
		updated_at: string // ISO 8601

		// User interaction state
		is_liked_by_current_user?: boolean

		expand?: {
			user?: {
				id: number
				username: string
				avatar_url?: string
			}
		}
	}

	let posts: InstasplatPost[] = [
		{
			id: 1,
			user_id: 1,
			title: "Coffee Shop Morning",
			description:
				"Captured this cozy corner of my favorite cafe. Love how the light streams through the window.",
			splat_file_url: "/splats/table.spz",
			view_count: 1247,
			like_count: 89,
			comment_count: 12,
			tags: ["coffee", "morning", "cozy", "cafe"],
			location: {
				name: "Blue Bottle Coffee",
				latitude: 37.7749,
				longitude: -122.4194
			},
			created_at: "2024-01-15T08:30:00Z",
			updated_at: "2024-01-15T08:30:00Z",
			is_liked_by_current_user: true,
			expand: {
				user: {
					id: 1,
					username: "andrew_captures",
					avatar_url:
						"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
				}
			}
		},
		{
			id: 2,
			user_id: 2,
			title: "Urban Exploration",
			description: "Found this amazing architectural detail downtown. The geometry is incredible!",
			splat_file_url: "/splats/johnathan.spz",
			view_count: 892,
			like_count: 156,
			comment_count: 23,
			tags: ["architecture", "urban", "geometry", "downtown"],
			location: {
				name: "Financial District",
				latitude: 37.7946,
				longitude: -122.3999
			},
			created_at: "2024-01-14T16:45:00Z",
			updated_at: "2024-01-14T16:45:00Z",
			is_liked_by_current_user: false,
			expand: {
				user: {
					id: 2,
					username: "johnathan_3d",
					avatar_url:
						"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
				}
			}
		},
		{
			id: 3,
			user_id: 3,
			title: "Nature's Detail",
			description: "Spent hours capturing this forest scene. Every leaf tells a story.",
			splat_file_url: "/splats/tryston.spz",
			view_count: 2103,
			like_count: 234,
			comment_count: 45,
			tags: ["nature", "forest", "peaceful", "outdoors"],
			created_at: "2024-01-13T11:20:00Z",
			updated_at: "2024-01-13T11:20:00Z",
			is_liked_by_current_user: true,
			expand: {
				user: {
					id: 3,
					username: "tryston_wild",
					avatar_url:
						"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
				}
			}
		}
	]
</script>

<div {@attach splatViewer("/splats/table.spz")}></div>

<style>
	div {
		height: 500px;
	}
</style>
