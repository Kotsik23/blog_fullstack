import { StackProps } from "@chakra-ui/react"

export interface IStat {
	label: string
	value: string
}

export interface StatItemProps extends StackProps, IStat {}
