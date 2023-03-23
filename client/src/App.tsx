import { Route, Routes } from "react-router-dom"
import MainLayout from "./components/Layouts/MainLayout"
import { ROUTES } from "./constants/routes.constants"
import {MainPage} from "./pages/MainPage";
import {AuthForm} from "./modules/AuthForm";

const App = () => {
	return (
		<Routes>
			<Route path={ROUTES.MAIN} element={<MainLayout />}>
				<Route index element={<MainPage />} />

				<Route path={ROUTES.LOGIN} element={<AuthForm type="login" />} />
				<Route path={ROUTES.REGISTER} element={<AuthForm type="register" />} />
			</Route>
		</Routes>
	)
}

export default App
