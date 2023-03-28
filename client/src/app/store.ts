import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "features/Auth"
import { apiSlice } from "./api/api.slice"

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		[authSlice.name]: authSlice.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
