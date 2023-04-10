import { Badge, Flex, Heading, Stack, ThemeTypings } from "@chakra-ui/react"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { useAppSelector } from "shared/utils/redux"
import { useTranslation } from "react-i18next"
import ChangeUserAvatar from "../ChangeUserAvatar/ChangeUserAvatar"

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
					<ChangeUserAvatar src={user?.avatarUrl} />

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
			</Flex>
		</Stack>
	)
}

export default Header
