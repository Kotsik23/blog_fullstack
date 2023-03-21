import { Route, Routes } from "react-router-dom"
import MainLayout from "./components/Layouts/MainLayout"
import { ROUTES } from "./constants/routes.constants"
import MainPage from "./pages/MainPage/MainPage"

const App = () => {
	return (
		<Routes>
			<Route path={ROUTES.MAIN} element={<MainLayout />}>
				<Route index element={<MainPage />} />
			</Route>
		</Routes>
	)
}

export default App
