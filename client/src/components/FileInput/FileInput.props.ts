import { Dispatch, RefObject, SetStateAction } from "react"
import { Control } from "react-hook-form"

export interface FileInputProps {
	name: string
	accept?: string[]
	control: Control<any, any>
	imageUrl: string | undefined
	setImageUrl: Dispatch<SetStateAction<string | undefined>>
}
