import { IAuthFields, IAuthResponse } from "../types/auth.interface"
import { authActions } from "features/Auth/model/auth"
import { apiSlice } from "app/api/api.slice"
import { API_ROUTES, API_METHODS } from "shared/constants/api"
import { IUser } from "shared/types/user"
import { RootState } from "app/store"

export const authApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		register: build.mutation<IAuthResponse, IAuthFields>({
			query: body => ({
				url: API_ROUTES.REGISTER,
				method: API_METHODS.POST,
				body,
			}),
			async onQueryStarted(arg, api) {
				try {
					const { data } = await api.queryFulfilled
					api.dispatch(authActions.setCredentials(data))
				} catch (error) {
					console.log(error)
				}
			},
		}),

		login: build.mutation<IAuthResponse, IAuthFields>({
			query: body => ({
				url: API_ROUTES.LOGIN,
				method: API_METHODS.POST,
				body,
			}),
			async onQueryStarted(arg, api) {
				try {
					const { data } = await api.queryFulfilled
					api.dispatch(authActions.setCredentials(data))
				} catch (error) {
					console.log(error)
				}
			},
		}),

		getProfile: build.mutation<IUser, void>({
			query: () => ({
				url: API_ROUTES.PROFILE,
				method: API_METHODS.GET,
			}),
			async onQueryStarted(arg, api) {
				try {
					const { data } = await api.queryFulfilled

					const accessToken = (api.getState() as RootState).auth.accessToken

					api.dispatch(authActions.setCredentials({ accessToken, user: data }))
				} catch (error) {
					console.log(error)
				}
			},
		}),

		logout: build.mutation<{ message: string }, void>({
			query: () => ({
				url: API_ROUTES.PROFILE,
				method: API_METHODS.DELETE,
			}),
			async onQueryStarted(arg, api) {
				try {
					await api.queryFulfilled
					api.dispatch(authActions.logout())
				} catch (error) {
					console.log(error)
				}
			},
		}),
	}),
})
