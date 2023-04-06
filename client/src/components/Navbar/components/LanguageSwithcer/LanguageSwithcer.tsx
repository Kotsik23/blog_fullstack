import { Select, useColorModeValue } from "@chakra-ui/react"
import i18next from "i18next"
import { ChangeEvent, useEffect, useState } from "react"

const LanguageSwithcer = () => {
	const focusBorderColor = useColorModeValue("purple.500", "purple.200")

	const [currentLanguage, setCurrentLanguage] = useState<string>(i18next.language)

	useEffect(() => {
		setCurrentLanguage(i18next.language)
	}, [i18next.language])

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const newLanguage = event.target.value
		setCurrentLanguage(newLanguage)
		i18next.changeLanguage(newLanguage)
	}

	return (
		<Select value={currentLanguage} w="full" maxW="80px" focusBorderColor={focusBorderColor} onChange={handleChange}>
			<option value="en">EN</option>
			<option value="ru">RU</option>
		</Select>
	)
}

export default LanguageSwithcer
