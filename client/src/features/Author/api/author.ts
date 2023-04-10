import { apiSlice } from "app/api/api.slice"
import { API_METHODS, API_ROUTES } from "shared/constants/api"
import { AuthorPost, IAuthor } from "../types/author.types"

export const authorApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getAuthorInfo: build.query<IAuthor, number>({
			query: id => ({
				url: `${API_ROUTES.USERS}/${id}`,
				method: API_METHODS.GET,
			}),
		}),

		getPostsList: build.query<AuthorPost[], number>({
			query: id => ({
				url: API_ROUTES.POSTS,
				method: API_METHODS.GET,
				params: {
					userId: id,
				},
			}),
		}),
	}),
})
