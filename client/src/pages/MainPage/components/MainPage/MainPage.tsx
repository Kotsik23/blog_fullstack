import { Stack } from "@chakra-ui/react"
import Hero from "../Hero/Hero"
import Newsletter from "../Newsletter/Newsletter"
import Testimonial from "../Testimonial/Testimonial"
import Stats from "../Stats/Stats"

const MainPage = () => {
	return (
		<Stack spacing="16">
			<Hero />
			<Stats />
			<Testimonial />
			<Newsletter />
		</Stack>
	)
}

export default MainPage
