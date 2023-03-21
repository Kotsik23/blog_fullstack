import { Box, Button, Container, Flex, Link, useColorModeValue } from "@chakra-ui/react"
import { FC } from "react"
import Logo from "../Logo/Logo"
import { Link as NavLink } from "react-router-dom"
import LanguageSwithcer from "./LanguageSwithcer/LanguageSwithcer"
import { MenuItems } from "./Navbar.constants"
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher"

const Navbar: FC = () => {
	// Styles
	const borderBottomColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300")
	const linkHoverColor = useColorModeValue("purple.500", "purple.200")

	return (
		<Box w="full" borderBottom="1px solid" borderBottomColor={borderBottomColor} as="nav">
			<Container maxW="container.xl" py="3" px="8" display="flex" justifyContent="space-between" alignItems="center">
				<Logo />

				<Flex align="center" gap={[6, null, null, 10]}>
					{MenuItems.map(item => (
						<Link
							key={item.id}
							as={NavLink}
							to={item.link}
							fontSize="md"
							transition="color 0.3s ease"
							_hover={{ color: linkHoverColor }}
						>
							{item.text}
						</Link>
					))}
				</Flex>

				<Flex gap="2" align="center">
					<LanguageSwithcer />
					<ThemeSwitcher />
					<Button colorScheme="purple">Регистрация</Button>
				</Flex>
			</Container>
		</Box>
	)
}

export default Navbar