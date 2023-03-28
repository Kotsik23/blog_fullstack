import { Heading } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { ROUTES } from "shared/constants/routes"

const Logo = () => {
	return (
		<Heading
			size="md"
			fontWeight="semibold"
			_hover={{ color: "primary" }}
			transition="color 0.3s ease"
			fontFamily="'Amatic SC', sans-serif"
			fontSize={"4xl"}
			textAlign="center"
		>
			<Link to={ROUTES.MAIN}>Блоггинг.</Link>
		</Heading>
	)
}

export default Logo
