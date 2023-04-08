import { AvatarProps } from "@chakra-ui/react"

export interface UserAvatarProps extends AvatarProps {
	handleClick: () => void
}
