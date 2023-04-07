import MainLayout from "components/Layout/MainLayout"
import { Auth } from "features/Auth"
import { Routes, Route } from "react-router-dom"
import { ROUTES } from "shared/constants/routes"
import { MainPage } from "./MainPage"
import ScrollToTop from "shared/utils/ScrollToTop"
import CreatePostPage from "./CreatePostPage"
import PostPage from "./PostPage"
import PostsPage from "./PostsPage"
import ProfilePage from "./ProfilePage"

const Routing = () => {
	return (
		<ScrollToTop>
			<Routes>
				<Route path={ROUTES.MAIN} element={<MainLayout />}>
					<Route index element={<MainPage />} />

					<Route path={ROUTES.LOGIN} element={<Auth type="login" />} />
					<Route path={ROUTES.REGISTER} element={<Auth type="register" />} />

					<Route path={ROUTES.POSTS} element={<PostsPage />} />
					<Route path={ROUTES.POSTS + "/:id"} element={<PostPage />} />
					<Route path={ROUTES.CREATE} element={<CreatePostPage />} />

					<Route path={ROUTES.PROFILE} element={<ProfilePage />} />
				</Route>
			</Routes>
		</ScrollToTop>
	)
}

export default Routing
