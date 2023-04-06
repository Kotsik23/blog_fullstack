import { Center, ChakraProvider, Spinner } from "@chakra-ui/react"
import Routing from "pages"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "./store"
import { theme } from "./theme"

import "./styles/global.css"
import i18n from "./i18n"
import { I18nextProvider } from "react-i18next"

const App = () => {
	return (
		<Provider store={store}>
			<ChakraProvider resetCSS theme={theme}>
				<BrowserRouter>
					<I18nextProvider i18n={i18n}>
						<Routing />
					</I18nextProvider>
				</BrowserRouter>
			</ChakraProvider>
		</Provider>
	)
}

export default App
