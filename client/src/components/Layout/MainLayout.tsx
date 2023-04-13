import { Container } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { Navbar } from "../Navbar"
import Footer from "../Footer/Footer"

const MainLayout = () => {
	return (
		<>
			<Navbar />
			<Container maxW="container.xl" as="main" minH="calc(100vh)" p="0">
				<Outlet />
			</Container>
			<Footer />
		</>
	)
}

export default MainLayout
