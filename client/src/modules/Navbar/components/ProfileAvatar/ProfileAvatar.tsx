import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { FC } from "react"
import { MdPerson, MdLogout } from "react-icons/md"

const ProfileAvatar = () => {
	return (
		<Menu>
			<MenuButton as={Avatar} size="sm" cursor="pointer" />
			<MenuList>
				<MenuItem icon={<MdPerson />}>Profile</MenuItem>
				<MenuItem icon={<MdLogout />}>Logout</MenuItem>
			</MenuList>
		</Menu>
	)
}

export default ProfileAvatar
