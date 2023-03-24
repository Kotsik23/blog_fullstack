import { Container } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { Navbar } from "../../modules/Navbar"
import Footer from "../Footer/Footer"

const MainLayout = () => {
	return (
		<>
			<Navbar />
			<Container maxW="container.xl" as="main" py="16" minH="calc(100vh)">
				<Outlet />
			</Container>
			<Footer />
		</>
	)
}

export default MainLayout
