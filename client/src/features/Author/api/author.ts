import { apiSlice } from "app/api/api.slice"
import { API_METHODS, API_ROUTES } from "shared/constants/api"
import { IAuthor } from "../types/author.types"

export const authorApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getAuthorInfo: build.query<IAuthor, number>({
			query: id => ({
				url: `${API_ROUTES.USERS}/${id}`,
				method: API_METHODS.GET,
			}),
		}),
	}),
})
