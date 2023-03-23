import { Box, Button, Container, Flex, Link, useColorModeValue } from "@chakra-ui/react"
import { Link as NavLink } from "react-router-dom"
import Logo from "../../../../components/Logo/Logo"
import { MenuItems } from "../../constants/Navbar.constants"
import LanguageSwithcer from "../LanguageSwithcer/LanguageSwithcer"
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher"
import { ROUTES } from "../../../../constants/routes.constants"

const Navbar = () => {
	const borderBottomColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300")

	return (
		<Box w="full" borderBottom="1px solid" borderBottomColor={borderBottomColor} as="nav">
			<Container maxW="container.xl" py="3" px="8" display="flex" justifyContent="space-between" alignItems="center">
				<Logo />

				<Flex align="center" gap={{ base: 6, lg: 8 }}>
					{MenuItems.map(item => (
						<Link
							key={item.id}
							as={NavLink}
							to={item.link}
							fontSize="md"
							transition="color 0.3s ease"
							_hover={{ color: "primary" }}
						>
							{item.text}
						</Link>
					))}
				</Flex>

				<Flex gap="2" align="center">
					<LanguageSwithcer />
					<ThemeSwitcher />
					<Button colorScheme="purple" as={NavLink} to={ROUTES.REGISTER}>
						Регистрация
					</Button>
				</Flex>
			</Container>
		</Box>
	)
}

export default Navbar
