import { Avatar, Badge, Button, Center, Flex, Heading, Spinner, Stack, ThemeTypings } from "@chakra-ui/react"
import { authorApi } from "features/Author/api/author"
import { useParams } from "react-router-dom"
import { IoPersonAdd } from "react-icons/io5"

const colors: Record<string, ThemeTypings["colorSchemes"]> = {
	ADMIN: "green",
	MANAGER: "blue",
	USER: "purple",
}

const Header = () => {
	const { id } = useParams()
	const { data: author, isLoading, isError, error } = authorApi.useGetAuthorInfoQuery(+id!)

	if (isLoading) {
		return (
			<Center>
				<Spinner colorScheme="purple" size="xl" />
			</Center>
		)
	}

	if (isError) {
		console.log(error)
		return <Heading>Some error</Heading>
	}

	return (
		<Flex justify="space-between" align="flex-start" direction={{ base: "column", md: "row" }} gap="8">
			<Flex gap="4" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }}>
				<Avatar size="2xl" src={author?.avatarUrl} />

				<Stack spacing="4">
					<Heading size="md" fontWeight="semibold">
						{author?.email}
					</Heading>
					<Flex flexWrap="wrap" gap="2">
						{author?.roles.map(role => (
							<Badge key={role} colorScheme={colors[role]}>
								{role}
							</Badge>
						))}
					</Flex>
				</Stack>
			</Flex>

			<Button
				variant="outline"
				colorScheme="purple"
				leftIcon={<IoPersonAdd fontSize="18" />}
				width={{ base: "full", md: "fit-content" }}
			>
				Подписаться
			</Button>
		</Flex>
	)
}

export default Header
