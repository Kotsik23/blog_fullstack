import { IconButton, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

const ThemeSwitcher = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<IconButton
			onClick={toggleColorMode}
			icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
			aria-label="theme-switcher"
			variant="outline"
		/>
	)
}

export default ThemeSwitcher
