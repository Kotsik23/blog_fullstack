import { Route, Routes } from "react-router-dom"
import MainLayout from "./components/Layouts/MainLayout"
import { MainPage } from "./pages/MainPage"
import { Auth } from "features/Auth"
import { ROUTES } from "shared/constants/routes"
import { PostsPage } from "pages/PostsPage"

const App = () => {
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

export default App
