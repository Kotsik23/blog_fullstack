import { ReactElement, useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

const ScrollToTop = ({ children }: { children: ReactElement | null }) => {
	const location = useLocation()

	useLayoutEffect(() => {
		document.documentElement.scrollTo(0, 0)
	}, [location.pathname, location.search])

	return children
}

export default ScrollToTop
