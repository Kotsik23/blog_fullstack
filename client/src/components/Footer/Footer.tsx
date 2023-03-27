import { Container, Stack, ButtonGroup, IconButton, Text } from "@chakra-ui/react"
import { FaGithub, FaLinkedin, FaTelegramPlane } from "react-icons/fa"
import Logo from "../Logo/Logo"

const Footer = () => {
	return (
		<Container as="footer" maxW="container.xl" py={{ base: "12", md: "16" }}>
			<Stack spacing={{ base: "4", md: "5" }}>
				<Stack justify="space-between" direction="row" align="center">
					<Logo />
					<ButtonGroup variant="ghost">
						<IconButton
							as="a"
							href="https://www.linkedin.com/in/oleg-smushko-57a722224/"
							aria-label="LinkedIn"
							icon={<FaLinkedin fontSize="1.25rem" />}
							target="_blank"
						/>
						<IconButton
							as="a"
							href="https://github.com/Kotsik23"
							aria-label="GitHub"
							icon={<FaGithub fontSize="1.25rem" />}
							target="_blank"
						/>
						<IconButton
							as="a"
							href="https://t.me/kotsik"
							aria-label="Telegram"
							icon={<FaTelegramPlane fontSize="1.25rem" />}
							target="_blank"
						/>
					</ButtonGroup>
				</Stack>
				<Text fontSize="sm" color="subtle">
					&copy; {new Date().getFullYear()} Блоггинг, Example Inc. Все права защищены.
				</Text>
			</Stack>
		</Container>
	)
}

export default Footer
