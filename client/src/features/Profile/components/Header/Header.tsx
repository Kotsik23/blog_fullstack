import { Badge, Button, Flex, Heading, Stack, ThemeTypings } from "@chakra-ui/react"
import { UserAvatar } from "../UserAvatar/UserAvatar"
import { BsFillPersonPlusFill, BsFillShareFill } from "react-icons/bs"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { useAppSelector } from "shared/utils/redux"

const colors: Record<string, ThemeTypings["colorSchemes"]> = {
	ADMIN: "green",
	MANAGER: "blue",
	USER: "purple",
}

const Header = () => {
	const user = useAppSelector(state => state.auth.user)

	return (
		<Stack>
			<SectionHeader>Ваш профиль</SectionHeader>
			<Flex justify="space-between" align="flex-start" direction={{ base: "column", md: "row" }} gap="8">
				<Flex gap="4" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }}>
					<UserAvatar src="https://bit.ly/code-beast" isVerified />

					<Stack spacing="4">
						<Heading size="md" fontWeight="semibold">
							{user?.email}
						</Heading>
						<Flex flexWrap="wrap" gap="2">
							{user?.roles.map(role => (
								<Badge key={role} colorScheme={colors[role]}>
									{role}
								</Badge>
							))}
						</Flex>
					</Stack>
				</Flex>

				<Flex gap="3" direction={{ base: "column", md: "row" }} w={{ base: "full", md: "max-content" }}>
					<Button variant="outline" w="full" colorScheme="purple" leftIcon={<BsFillPersonPlusFill />}>
						Подписаться
					</Button>
					<Button variant="outline" w="full" leftIcon={<BsFillShareFill />}>
						Поделиться
					</Button>
				</Flex>
			</Flex>
		</Stack>
	)
}

export default Header
