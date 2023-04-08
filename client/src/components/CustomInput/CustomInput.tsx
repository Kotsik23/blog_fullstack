import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	useDisclosure,
} from "@chakra-ui/react"
import { Controller } from "react-hook-form"
import { CustomInputProps } from "./CustomInput.props"
import { HiEye, HiEyeOff } from "react-icons/hi"

const CustomInput = (props: CustomInputProps) => {
	const { isOpen, onToggle } = useDisclosure()

	const app = 123

	return (
		<Controller
			name={props.name}
			control={props.control}
			render={({ field, fieldState: { error } }) => (
				<FormControl isRequired isInvalid={!!error}>
					<FormLabel htmlFor={props.name}>{props.title}</FormLabel>
					{props.type === "password" ? (
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
								{...props}
								{...field}
								id={props.name}
								type={isOpen ? "text" : "password"}
								autoComplete="current-password"
								focusBorderColor={props.focusBorderColor}
							/>
						</InputGroup>
					) : (
						<Input {...props} {...field} id={props.name} focusBorderColor={props.focusBorderColor} />
					)}
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	)
}

export default CustomInput
