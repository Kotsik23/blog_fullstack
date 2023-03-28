import { apiSlice } from "app/api/api.slice"
import { API_ROUTES, API_METHODS } from "shared/constants/api"
import { IPost, IPostAll, IPostOne } from "shared/types/post"

export const postsApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getAllPosts: build.query<IPostAll[], void>({
			query: () => ({
				url: API_ROUTES.POSTS,
				method: API_METHODS.GET,
			}),
			providesTags: result =>
				result ? [...result.map(({ id }) => ({ type: "Post" as const, id })), "Post"] : ["Post"],
		}),

		getPostById: build.query<IPostOne, number>({
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

		updatePost: build.mutation<IPost, Partial<IPost>>({
			query: body => ({
				url: `${API_ROUTES.POSTS}/${body.id}`,
				method: API_METHODS.PATCH,
				body,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
		}),

		deletePost: build.mutation<IPost, number>({
			query: id => ({
				url: `${API_ROUTES.POSTS}/${id}`,
				method: API_METHODS.DELETE,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg }],
		}),
	}),
})
