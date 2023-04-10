import { Stack } from "@chakra-ui/react"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { AuthorHeader, AuthorPostsList, AuthorStatistics } from "features/Author"
import { useParams } from "react-router-dom"

const AuthorPage = () => {
	const { id } = useParams()

	return (
		<Stack spacing="4">
			<SectionHeader>Автор #{id}</SectionHeader>
			<AuthorHeader />
			<SectionHeader>Статистика</SectionHeader>
			<AuthorStatistics />
			<SectionHeader>Посты автора</SectionHeader>
			<AuthorPostsList />
		</Stack>
	)
}

export default AuthorPage
