import {
	FormControl,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputProps,
	InputRightElement,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react"
import { forwardRef } from "react"
import { HiEye, HiEyeOff } from "react-icons/hi"

const PasswordField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { isOpen, onToggle } = useDisclosure()

	const primary = useColorModeValue("purple.500", "purple.200")

	return (
		<FormControl isRequired>
			<FormLabel htmlFor="password">Пароль</FormLabel>
			<InputGroup>
				<InputRightElement>
					<IconButton
						variant="link"
						aria-label={isOpen ? "Mask password" : "Reveal password"}
						icon={isOpen ? <HiEyeOff /> : <HiEye />}
						onClick={onToggle}
					/>
				</InputRightElement>
				<Input
					id="password"
					ref={ref}
					type={isOpen ? "text" : "password"}
					autoComplete="current-password"
					focusBorderColor={primary}
					{...props}
				/>
			</InputGroup>
		</FormControl>
	)
})

export default PasswordField
