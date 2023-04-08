import { Navigate, Outlet, useLocation } from "react-router-dom"
import { ROUTES } from "shared/constants/routes"
import { useAppSelector } from "shared/utils/redux"

const RequiredAuth = () => {
	const location = useLocation()
	const user = useAppSelector(state => state.auth.user)

	return user ? <Outlet /> : <Navigate to={ROUTES.REGISTER} state={{ from: location }} />
}

export default RequiredAuth
