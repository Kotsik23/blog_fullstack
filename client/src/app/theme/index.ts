import { extendTheme, theme as baseTheme, ThemeConfig } from "@chakra-ui/react"
import * as foundations from "./foundations"

const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: true,
}

export const theme: Record<string, any> = extendTheme({
	...foundations,
	colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
	config,
})
