import { AvatarProps, Avatar, AvatarBadge, Icon } from "@chakra-ui/react"
import { GoVerified } from "react-icons/go"

interface UserAvatarProps extends AvatarProps {
	isVerified?: boolean
}

const UserAvatar = (props: UserAvatarProps) => {
	const { isVerified, ...avatarProps } = props

	return (
		<Avatar size="2xl" {...avatarProps}>
			{isVerified && (
				<AvatarBadge borderWidth="4px" borderColor="bg-surface" insetEnd="3" bottom="3" bg="bg-surface">
					<Icon as={GoVerified} fontSize="2xl" color="primary" />
				</AvatarBadge>
			)}
		</Avatar>
	)
}

export default UserAvatar
