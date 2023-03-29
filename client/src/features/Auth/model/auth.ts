import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IAuthState } from "../types/auth.interface"

export const LS_AUTH_KEY = "auth"

const { accessToken, user } = JSON.parse(localStorage.getItem(LS_AUTH_KEY) || "false") as IAuthState

const initialState: IAuthState = {
	accessToken,
	user,
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<IAuthState>) => {
			const { accessToken, user } = action.payload
			state.accessToken = accessToken
			state.user = user
			localStorage.setItem(LS_AUTH_KEY, JSON.stringify(state))
		},

		logout: state => {
			state.accessToken = null
			state.user = null
			localStorage.removeItem(LS_AUTH_KEY)
		},
	},
})

export const authActions = authSlice.actions
