import {
	Avatar,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorModeValue,
	useDisclosure,
	useToast,
} from "@chakra-ui/react"
import { MdPerson, MdLogout } from "react-icons/md"
import { TOAST_DEFAULT_OPTIONS } from "../../../../constants/toast.constants"
import { authApi } from "../../../../store/api/auth.api"
import ConfirmLogoutDialog from "../ConfirmLogoutDialog/ConfirmLogoutDialog"

const ProfileAvatar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [logout, { isLoading }] = authApi.useLogoutMutation()
	const toast = useToast(TOAST_DEFAULT_OPTIONS)

	const onLogoutHandler = async () => {
		try {
			await logout().unwrap()
			toast({
				status: "info",
				title: "Успешно",
				description: "Вы успешно вышли из своего аккаунта",
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Menu>
				<MenuButton as={Avatar} size="sm" cursor="pointer" />
				<MenuList>
					<MenuItem icon={<MdPerson />} fontWeight="semibold">
						Profile
					</MenuItem>
					<MenuItem
						icon={<MdLogout />}
						fontWeight="semibold"
						color={useColorModeValue("red.500", "red.300")}
						onClick={onOpen}
					>
						Logout
					</MenuItem>
				</MenuList>
			</Menu>

			<ConfirmLogoutDialog
				isOpen={isOpen}
				onClose={onClose}
				onClickHandler={onLogoutHandler}
				isLoading={isLoading}
			/>
		</>
	)
}

export default ProfileAvatar
