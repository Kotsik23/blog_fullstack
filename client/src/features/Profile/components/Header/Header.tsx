import { Badge, Button, Flex, Heading, Stack, ThemeTypings } from "@chakra-ui/react"
import { BsFillPersonPlusFill, BsFillShareFill } from "react-icons/bs"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { useAppSelector } from "shared/utils/redux"
import { UserAvatar } from "features/Profile"
import { useTranslation } from "react-i18next"

const colors: Record<string, ThemeTypings["colorSchemes"]> = {
	ADMIN: "green",
	MANAGER: "blue",
	USER: "purple",
}

const Header = () => {
	const { t } = useTranslation()
	const user = useAppSelector(state => state.auth.user)

	return (
		<Stack>
			<SectionHeader>{t("profile.heading")}</SectionHeader>
			<Flex justify="space-between" align="flex-start" direction={{ base: "column", md: "row" }} gap="8">
				<Flex gap="4" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }}>
					<UserAvatar src={user?.avatarUrl} isVerified />

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

				<Flex gap="3" direction={{ base: "column", md: "row" }} w={{ base: "full", md: "sm" }}>
					<Button variant="outline" w="full" colorScheme="purple" leftIcon={<BsFillPersonPlusFill />}>
						{t("profile.subscribe")}
					</Button>
					<Button variant="outline" w="full" leftIcon={<BsFillShareFill />}>
						{t("profile.share")}
					</Button>
				</Flex>
			</Flex>
		</Stack>
	)
}

export default Header
