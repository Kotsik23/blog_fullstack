import { RootState } from "../index"
import { API_METHODS, API_ROUTES } from "../../constants/api.constants"
import { IAuthFields, IAuthResponse } from "../../shared/types/auth.interface"
import { authActions } from "../slices/auth.slice"
import { apiSlice } from "./api.slice"
import { IUser } from "../../shared/types/user.interface"

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

		getProfile: build.mutation<{ user: IUser }, void>({
			query: () => ({
				url: API_ROUTES.PROFILE,
				method: API_METHODS.GET,
			}),
			async onQueryStarted(arg, api) {
				try {
					const { data } = await api.queryFulfilled

					const accessToken = (api.getState() as RootState).auth.accessToken
					api.dispatch(authActions.setCredentials({ accessToken, user: data.user }))
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
