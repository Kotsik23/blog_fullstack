import { Select, useColorModeValue } from "@chakra-ui/react"
import { FC } from "react"

const LanguageSwithcer: FC = () => {
	const focusBorderColor = useColorModeValue("purple.500", "purple.200")
	return (
		<Select defaultValue="ru" w="full" maxW="80px" focusBorderColor={focusBorderColor}>
			<option value="en">EN</option>
			<option value="ru">RU</option>
		</Select>
	)
}

export default LanguageSwithcer
