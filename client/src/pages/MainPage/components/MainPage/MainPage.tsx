import { Flex } from "@chakra-ui/react"
import Hero from "../Hero/Hero"
import { Posts } from "../../../../modules/Posts"

const MainPage = () => {
	return (
		<Flex justify="flex-start" align="center" direction="column">
			<Hero />
			<Posts />
		</Flex>
	)
}

export default MainPage
