import MainLayout from "components/Layout/MainLayout"
import { Auth } from "features/Auth"
import { Routes, Route } from "react-router-dom"
import { ROUTES } from "shared/constants/routes"
import { MainPage } from "./MainPage"
import ScrollToTop from "shared/utils/ScrollToTop"
import CreatePostPage from "./CreatePostPage"
import OnePostPage from "./PostPage"
import AllPostsPage from "./PostsPage"
import ProfilePage from "./ProfilePage"
import WithUser from "app/hoc/WithUser"
import RequiredAuth from "app/hoc/RequiredAuth"
import AuthorPage from "./AuthorPage"

const Routing = () => {
	return (
		<ScrollToTop>
			<Routes>
				<Route element={<WithUser />}>
					<Route path={ROUTES.MAIN} element={<MainLayout />}>
						<Route index element={<MainPage />} />

						<Route path={ROUTES.LOGIN} element={<Auth type="login" />} />
						<Route path={ROUTES.REGISTER} element={<Auth type="register" />} />

						<Route path={ROUTES.POSTS} element={<AllPostsPage />} />
						<Route path={ROUTES.POSTS + "/:id"} element={<OnePostPage />} />

						<Route path={`${ROUTES.AUTHOR}/:id`} element={<AuthorPage />} />

						{/* PAGES FOR AUTHENTICATED USERS */}
						<Route element={<RequiredAuth />}>
							<Route path={ROUTES.CREATE} element={<CreatePostPage />} />

							<Route path={`${ROUTES.PROFILE}`} element={<ProfilePage />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</ScrollToTop>
	)
}

export default Routing
