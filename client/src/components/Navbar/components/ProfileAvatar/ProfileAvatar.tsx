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
import { Link as NavLink, useNavigate } from "react-router-dom"
import { MdPerson, MdLogout } from "react-icons/md"
import { AiOutlinePlus } from "react-icons/ai"
import { TOAST_DEFAULT_OPTIONS } from "shared/constants/toast"
import { authApi } from "features/Auth/api/auth"
import ConfirmLogoutDialog from "../ConfirmLogoutDialog/ConfirmLogout"
import { ROUTES } from "shared/constants/routes"
import { ProfileAvatarProps } from "./ProfileAvatar.props"

const ProfileAvatar = ({ avatarUrl }: ProfileAvatarProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [logout, { isLoading }] = authApi.useLogoutMutation()
	const toast = useToast(TOAST_DEFAULT_OPTIONS)
	const navigate = useNavigate()

	const onLogoutHandler = async () => {
		try {
			await logout().unwrap()
			toast({
				status: "info",
				title: "Успешно",
				description: "Вы успешно вышли из своего аккаунта",
			})
			navigate(ROUTES.MAIN)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Menu>
				<MenuButton as={Avatar} size="sm" cursor="pointer" src={avatarUrl} />
				<MenuList>
					<MenuItem icon={<MdPerson />} fontWeight="semibold" as={NavLink} to={ROUTES.PROFILE}>
						Профиль
					</MenuItem>
					<MenuItem icon={<AiOutlinePlus />} fontWeight="semibold" as={NavLink} to={ROUTES.CREATE}>
						Создать пост
					</MenuItem>
					<MenuItem
						icon={<MdLogout />}
						fontWeight="semibold"
						color={useColorModeValue("red.500", "red.300")}
						onClick={onOpen}
					>
						Выйти
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
