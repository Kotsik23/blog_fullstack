import { Center, Spinner } from "@chakra-ui/react"
import { authApi } from "features/Auth"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

const WithUser = () => {
	const [getProfile, { isLoading }] = authApi.useGetProfileMutation()

	useEffect(() => {
		getProfile()
	}, [])

	if (isLoading) {
		return (
			<Center minH="100vh">
				<Spinner size="lg" colorScheme="purple" />
			</Center>
		)
	}

	return <Outlet />
}

export default WithUser
