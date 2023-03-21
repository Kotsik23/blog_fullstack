import { Flex } from "@chakra-ui/react"
import { FC } from "react"
import Hero from "../../components/Hero/Hero"

const MainPage: FC = () => {
	return (
		<Flex justify="center" align="center" direction="column">
			<Hero />
		</Flex>
	)
}

export default MainPage
