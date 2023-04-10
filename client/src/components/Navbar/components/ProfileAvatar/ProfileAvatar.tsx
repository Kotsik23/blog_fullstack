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
import { Link as NavLink, useNavigate, useParams } from "react-router-dom"
import { MdPerson, MdLogout } from "react-icons/md"
import { AiOutlinePlus, AiTwotoneBulb } from "react-icons/ai"
import { TOAST_DEFAULT_OPTIONS } from "shared/constants/toast"
import { authApi } from "features/Auth/api/auth"
import ConfirmLogoutDialog from "../ConfirmLogoutDialog/ConfirmLogout"
import { ROUTES } from "shared/constants/routes"
import { ProfileAvatarProps } from "./ProfileAvatar.props"
import { useTranslation } from "react-i18next"

const ProfileAvatar = ({ user }: ProfileAvatarProps) => {
	const { t } = useTranslation()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [logout, { isLoading }] = authApi.useLogoutMutation()
	const toast = useToast(TOAST_DEFAULT_OPTIONS)
	const navigate = useNavigate()

	const onLogoutHandler = async () => {
		try {
			await logout().unwrap()
			toast({
				status: "info",
				title: t("toast.success"),
				description: t("toast.logout"),
			})
			navigate(ROUTES.MAIN)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Menu>
				<MenuButton as={Avatar} size="sm" cursor="pointer" src={user.avatarUrl} />
				<MenuList>
					<MenuItem icon={<MdPerson />} fontWeight="semibold" as={NavLink} to={ROUTES.PROFILE}>
						{t("profileAvatar.profile")}
					</MenuItem>
					<MenuItem icon={<AiOutlinePlus />} fontWeight="semibold" as={NavLink} to={ROUTES.CREATE}>
						{t("profileAvatar.createPost")}
					</MenuItem>
					<MenuItem icon={<AiTwotoneBulb />} fontWeight="semibold" as={NavLink} to={`${ROUTES.AUTHOR}/${user.id}`}>
						{t("profileAvatar.author")}
					</MenuItem>
					<MenuItem
						icon={<MdLogout />}
						fontWeight="semibold"
						color={useColorModeValue("red.500", "red.300")}
						onClick={onOpen}
					>
						{t("profileAvatar.logout")}
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
