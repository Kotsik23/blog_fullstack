import { Box, Button, Container, Flex, Link, useColorModeValue } from "@chakra-ui/react"
import { Link as NavLink } from "react-router-dom"
import Logo from "../../../Logo/Logo"
import { MenuItems } from "../../constants/Navbar.constants"
import LanguageSwithcer from "../LanguageSwithcer/LanguageSwithcer"
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher"
import { ROUTES } from "shared/constants/routes"
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar"
import { useAppSelector } from "shared/utils/redux"
import { useTranslation } from "react-i18next"

const Navbar = () => {
	const user = useAppSelector(state => state.auth.user)
	const { t } = useTranslation()

	const borderBottomColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300")

	return (
		<Box w="full" borderBottom="1px solid" borderBottomColor={borderBottomColor} as="nav">
			<Container maxW="container.xl" py="3" display="flex" justifyContent="space-between" alignItems="center">
				<Logo />

				<Flex align="center" gap={{ base: 6, lg: 8 }} display={{ base: "none", md: "flex" }}>
					{MenuItems.map(item => (
						<Link
							key={item.id}
							as={NavLink}
							to={item.link}
							fontSize="md"
							fontWeight="semibold"
							transition="color 0.3s ease"
							_hover={{ color: "primary" }}
						>
							{t(item.text)}
						</Link>
					))}
				</Flex>

				<Flex gap="2" align="center">
					<LanguageSwithcer />
					<ThemeSwitcher />
					{user ? (
						<ProfileAvatar user={user} />
					) : (
						<Button colorScheme="purple" as={NavLink} to={ROUTES.REGISTER}>
							{t("navbar.register")}
						</Button>
					)}
				</Flex>
			</Container>
		</Box>
	)
}

export default Navbar
