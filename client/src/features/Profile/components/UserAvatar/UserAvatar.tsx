import { Avatar, AvatarBadge, IconButton } from "@chakra-ui/react"
import { FiEdit2 } from "react-icons/fi"
import { UserAvatarProps } from "./UserAvatar.props"

const UserAvatar = (props: UserAvatarProps) => {
	const { handleClick, ...avatarProps } = props
	return (
		<Avatar size="2xl" {...avatarProps}>
			<AvatarBadge borderWidth="4px" borderColor="bg-surface" insetEnd="3" bottom="3" bg="bg-surface">
				<IconButton
					size="sm"
					icon={<FiEdit2 />}
					aria-label="change-avatar"
					rounded="full"
					colorScheme="purple"
					onClick={handleClick}
				/>
			</AvatarBadge>
		</Avatar>
	)
}

export default UserAvatar
