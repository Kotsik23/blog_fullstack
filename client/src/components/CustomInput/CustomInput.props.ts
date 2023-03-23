import { InputProps } from "@chakra-ui/react"
import { Control } from "react-hook-form"

export interface CustomInputProps extends InputProps {
	name: string
	title: string
	control: Control<any, any>
}
