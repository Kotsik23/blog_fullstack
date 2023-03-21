import { Flex } from "@chakra-ui/react"
import { FC } from "react"
import Hero from "../../components/Hero/Hero"
import Posts from "../../components/Posts/Posts"

const MainPage: FC = () => {
	return (
		<Flex justify="flex-start" align="center" direction="column">
			<Hero />
			<Posts />
		</Flex>
	)
}

export default MainPage
