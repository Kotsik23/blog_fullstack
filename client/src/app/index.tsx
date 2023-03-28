import { ChakraProvider } from "@chakra-ui/react"
import Routing from "pages"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "./store"
import { theme } from "./theme"

import "./styles/global.css"

const App = () => {
	return (
		<Provider store={store}>
			<ChakraProvider resetCSS theme={theme}>
				<BrowserRouter>
					<Routing />
				</BrowserRouter>
			</ChakraProvider>
		</Provider>
	)
}

export default App
