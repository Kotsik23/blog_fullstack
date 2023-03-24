import { Flex } from "@chakra-ui/react"
import Hero from "../Hero/Hero"
import { Posts } from "../../../../modules/Posts"
import Newsletter from "../Newsletter/Newsletter"
import Testimonial from "../Testimonial/Testimonial"

const MainPage = () => {
	return (
		<Flex justify="flex-start" align="center" direction="column">
			<Hero />
			{/* <Posts /> */}
			<Testimonial />
			<Newsletter />
		</Flex>
	)
}

export default MainPage
