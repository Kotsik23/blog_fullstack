import { apiSlice } from "app/api/api.slice"
import { RootState } from "app/store"
import { authActions } from "features/Auth/model/auth"
import { API_METHODS, API_ROUTES } from "shared/constants/api"
import { IUser } from "shared/types/user"
import { UpdateProfilePayload } from "../types/profile.interface"

export const profileApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		updateProfile: build.mutation<IUser, UpdateProfilePayload>({
			query: body => ({
				url: API_ROUTES.PROFILE,
				method: API_METHODS.PATCH,
				body,
			}),
			async onQueryStarted(arg, api) {
				try {
					const { data } = await api.queryFulfilled
					const state = (api.getState() as RootState).auth
					api.dispatch(authActions.setCredentials({ ...state, user: data }))
				} catch (error) {
					console.log(error)
				}
			},
		}),
	}),
})
