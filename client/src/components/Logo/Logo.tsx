import { Heading, useColorModeValue } from "@chakra-ui/react"
import { FC } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../constants/routes.constants"

const Logo: FC = () => {
	const hoverColor = useColorModeValue("purple.500", "purple.200")
	return (
		<Heading
			size="md"
			fontWeight="semibold"
			_hover={{ color: hoverColor }}
			transition="color 100ms linear"
			fontFamily="'Amatic SC', sans-serif"
			fontSize={"4xl"}
		>
			<Link to={ROUTES.MAIN}>Блоггинг.</Link>
		</Heading>
	)
}

export default Logo
