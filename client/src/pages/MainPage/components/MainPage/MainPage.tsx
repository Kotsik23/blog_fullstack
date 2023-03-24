import { Flex } from "@chakra-ui/react"
import Hero from "../Hero/Hero"
import { Posts } from "../../../../modules/Posts"
import Newsletter from "../Newsletter/Newsletter"

const MainPage = () => {
	return (
		<Flex justify="flex-start" align="center" direction="column">
			<Hero />
			{/* <Posts /> */}
			<Newsletter />
		</Flex>
	)
}

export default MainPage
