import { Center, Spinner, Heading, SimpleGrid, useColorModeValue } from "@chakra-ui/react"
import { authorApi } from "../../api/author"
import { useParams } from "react-router-dom"
import StatisticsCard from "./StatisticsCard/StatisticsCard"
import { MdOutlineFavorite, MdComment, MdArticle } from "react-icons/md"

const Statistics = () => {
	const { id } = useParams()
	const { data: author, isLoading, isError, error } = authorApi.useGetAuthorInfoQuery(+id!)

	const purpleColor = useColorModeValue("purple.400", "purple.300")
	const blueColor = useColorModeValue("blue.400", "blue.300")
	const orangeColor = useColorModeValue("orange.400", "orange.300")

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
		<SimpleGrid columns={[1, 2, 3]} spacing="6">
			<StatisticsCard
				icon={MdArticle}
				value={author?._count.posts!}
				description="Количество постов у автора"
				color={purpleColor}
			/>
			<StatisticsCard
				icon={MdOutlineFavorite}
				value={author?._count.likedPosts!}
				description="Столько постов оценил автор"
				color={blueColor}
			/>
			<StatisticsCard
				icon={MdComment}
				value={author?._count.comments!}
				description="Активность в комментариях"
				color={orangeColor}
			/>
		</SimpleGrid>
	)
}

export default Statistics
