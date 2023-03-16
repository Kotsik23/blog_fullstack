import { extendTheme, theme as baseTheme } from "@chakra-ui/react"
import * as foundations from "./foundations"

export const theme: Record<string, any> = extendTheme({
	...foundations,
	colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
})
