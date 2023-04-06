import { apiSlice } from "app/api/api.slice"
import { API_METHODS, API_ROUTES } from "shared/constants/api"
import { IComment } from "shared/types/comment"
import { CreateCommentPayload } from "../types/comment.interface"

export const commentsApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getCommenstByPost: build.query<IComment[], number>({
			query: id => ({
				url: `${API_ROUTES.COMMENTS}/${id}`,
				method: API_METHODS.GET,
			}),
			providesTags: result =>
				result ? [...result.map(({ id }) => ({ type: "Comment" as const, id })), "Comment"] : ["Comment"],
		}),

		createComment: build.mutation<IComment, CreateCommentPayload & { id: number }>({
			query: ({ id, ...body }) => ({
				url: `${API_ROUTES.COMMENTS}/${id}`,
				method: API_METHODS.PATCH,
				body,
			}),
			invalidatesTags: ["Comment"],
		}),

		deleteComment: build.mutation<IComment, number>({
			query: id => ({
				url: API_ROUTES.COMMENTS,
				method: API_METHODS.DELETE,
				params: id,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Comment", id: arg }],
		}),
	}),
})
