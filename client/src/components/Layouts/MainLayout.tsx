import { Container } from "@chakra-ui/react"
import { FC } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"

const MainLayout: FC = () => {
	return (
		<>
			<Navbar />
			<Container maxW="container.xl" as="main" py="16">
				<Outlet />
			</Container>
		</>
	)
}

export default MainLayout