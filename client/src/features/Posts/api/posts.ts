import { apiSlice } from "app/api/api.slice"
import { API_ROUTES, API_METHODS } from "shared/constants/api"
import { IPost, IPostAllResponse, IPostOne } from "shared/types/post"

export const postsApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getAllPosts: build.query<IPostAllResponse, { page: number; perPage: number }>({
			query: ({ page, perPage }) => ({
				url: API_ROUTES.POSTS,
				method: API_METHODS.GET,
				params: {
					page,
					perPage,
				},
			}),
			providesTags: result =>
				result ? [...result.posts.map(({ id }) => ({ type: "Post" as const, id })), "Post"] : ["Post"],
		}),

		getPostById: build.query<IPostOne, string>({
			query: id => ({
				url: `${API_ROUTES.POSTS}/${id}`,
				method: API_METHODS.GET,
			}),
			providesTags: ["Post"],
		}),

		addPost: build.mutation<IPost, FormData>({
			query: body => ({
				url: API_ROUTES.POSTS,
				method: API_METHODS.POST,
				body: body,
			}),
			invalidatesTags: ["Post"],
		}),

		updatePost: build.mutation<IPost, { id: string; data: FormData }>({
			query: ({ id, data }) => ({
				url: `${API_ROUTES.POSTS}/${id}`,
				method: API_METHODS.PATCH,
				body: data,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Post" }],
		}),

		deletePost: build.mutation<IPost, number>({
			query: id => ({
				url: `${API_ROUTES.POSTS}/${id}`,
				method: API_METHODS.DELETE,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg }],
		}),

		toggleLike: build.mutation<Omit<IPostOne, "author">, number>({
			query: id => ({
				url: `${API_ROUTES.POSTS}/like/${id}`,
				method: API_METHODS.PATCH,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg }],
		}),

		uploadFile: build.query<{ url: string }, FormData>({
			query: body => ({
				url: "/files",
				method: API_METHODS.POST,
				body,
			}),
		}),
	}),
})
