import { BaseQueryApi, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../index"
import { authActions } from "../slices/auth.slice"
import { API_ROUTES } from "../../constants/api.constants"

const SERVER_URL = process.env.REACT_APP_SERVER_URL
const SERVER_API_PREFIX = "/api"

const baseUrl = SERVER_URL + SERVER_API_PREFIX

const baseQuery = fetchBaseQuery({
	baseUrl,
	credentials: "include",
	prepareHeaders(headers, api) {
		const accessToken = (api.getState() as RootState).auth.accessToken

		if (accessToken) {
			headers.set("authorizaton", `Bearer ${accessToken}`)
		}

		return headers
	},
})

const baseQueryWithRefresh = async (args: any, api: BaseQueryApi, extraOptions: any) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result?.error?.status === 401) {
		console.log("Sending refresh token...")

		const refreshResult = await baseQuery(API_ROUTES.REFRESH, api, extraOptions)

		if (refreshResult?.data) {
			api.dispatch(authActions.setCredentials(refreshResult.data))
			result = await baseQuery(args, api, extraOptions)
		} else {
			if (refreshResult.error?.status === 401) {
				console.log("Your login has exoired")
			}
			return refreshResult
		}
	}

	return result
}

export const apiSlice = createApi({
	reducerPath: "api/slice",
	baseQuery: baseQueryWithRefresh,
	endpoints: build => ({}),
	tagTypes: [],
})
