import { Heading } from "@chakra-ui/react"
import { FC } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../constants/routes.constants"

const Logo: FC = () => {
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
