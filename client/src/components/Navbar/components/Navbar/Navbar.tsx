import { Box, Button, chakra, Container, Flex, Text, useColorModeValue } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import Logo from "../../../Logo/Logo"
import { MenuItems } from "../../constants/Navbar.constants"
import LanguageSwithcer from "../LanguageSwithcer/LanguageSwithcer"
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher"
import { ROUTES } from "shared/constants/routes"
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar"
import { useAppSelector } from "shared/utils/redux"

const ChakraNavLink = chakra(NavLink)

const Navbar = () => {
	const user = useAppSelector(state => state.auth.user)

	const borderBottomColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300")

	return (
		<Box w="full" borderBottom="1px solid" borderBottomColor={borderBottomColor} as="nav">
			<Container maxW="container.xl" py="3" display="flex" justifyContent="space-between" alignItems="center">
				<Logo />

				<Flex align="center" gap={{ base: 6, lg: 8 }} display={{ base: "none", md: "flex" }}>
					{MenuItems.map(item => (
						<ChakraNavLink
							key={item.id}
							to={item.link}
							fontSize="md"
							fontWeight="semibold"
							transition="color 0.3s ease"
							_hover={{ color: "primary" }}
						>
							{({ isActive }) => <Text color={isActive ? "primary" : ""}>{item.text}</Text>}
						</ChakraNavLink>
					))}
				</Flex>

				<Flex gap="2" align="center">
					<LanguageSwithcer />
					<ThemeSwitcher />
					{user ? (
						<ProfileAvatar avatarUrl={user.avatarUrl} />
					) : (
						<Button colorScheme="purple" as={NavLink} to={ROUTES.REGISTER}>
							Регистрация
						</Button>
					)}
				</Flex>
			</Container>
		</Box>
	)
}

export default Navbar
