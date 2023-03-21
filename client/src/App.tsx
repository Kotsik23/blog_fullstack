import { Route, Routes } from "react-router-dom"
import MainLayout from "./components/Layouts/MainLayout"
import { ROUTES } from "./constants/routes.constants"

const App = () => {
	return (
		<Routes>
			<Route path={ROUTES.MAIN} element={<MainLayout />}></Route>
		</Routes>
	)
}

export default App
