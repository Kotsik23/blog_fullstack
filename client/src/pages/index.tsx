import MainLayout from "components/Layout/MainLayout"
import { Auth } from "features/Auth"
import { Routes, Route } from "react-router-dom"
import { ROUTES } from "shared/constants/routes"
import { MainPage } from "./MainPage"
import { PostsPage } from "./PostsPage"

const Routing = () => {
	return (
		<Routes>
			<Route path={ROUTES.MAIN} element={<MainLayout />}>
				<Route index element={<MainPage />} />

				<Route path={ROUTES.LOGIN} element={<Auth type="login" />} />
				<Route path={ROUTES.REGISTER} element={<Auth type="register" />} />

				<Route path={ROUTES.POSTS} element={<PostsPage />} />
			</Route>
		</Routes>
	)
}

export default Routing
