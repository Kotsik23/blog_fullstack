import { Avatar, AvatarBadge, Button, Stack, IconButton, Input, useToast, Text } from "@chakra-ui/react"
import { profileApi } from "features/Profile/api/profile"
import { ChangeEvent, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { FiEdit2, FiCheck, FiXCircle } from "react-icons/fi"
import { SUPPORTED_FORMATS } from "shared/constants/files"
import { TOAST_DEFAULT_OPTIONS } from "shared/constants/toast"
import { ValidationError } from "yup"
import { changeAvatarSchema } from "./schema"
import { ChangeUserAvatarProps } from "./ChangeUserAvatar.props"

const ChangeUserAvatar = (props: ChangeUserAvatarProps) => {
	const { t } = useTranslation()
	const { src, ...avatarProps } = props
	const acceptString = SUPPORTED_FORMATS.join(", ")

	const [avatar, setAvatar] = useState<File | undefined>()
	const [avatarUrl, setAvatarUrl] = useState<string | undefined>(src)
	const inputRef = useRef<HTMLInputElement>(null)
	const toast = useToast(TOAST_DEFAULT_OPTIONS)
	const [update, { isLoading }] = profileApi.useUpdateProfileAvatarMutation()

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (files && files[0]) {
			const url = URL.createObjectURL(files[0])
			setAvatarUrl(url)
			setAvatar(files[0])
		} else {
			setAvatar(undefined)
			setAvatarUrl(src)
		}
	}

	const onResetClick = () => {
		setAvatar(undefined)
		setAvatarUrl(src)
	}

	const onInputClick = () => {
		inputRef.current?.click()
	}

	const onSaveClick = async () => {
		try {
			changeAvatarSchema.validateSync({ avatar })

			const formData = new FormData()
			formData.append("image", avatar!)

			await update(formData).unwrap()

			toast({
				status: "success",
				title: t("toast.success"),
				description: t("toast.updateAvatar"),
			})
			setAvatar(undefined)
		} catch (error) {
			if (error instanceof ValidationError) {
				toast({
					status: "error",
					title: t("toast.error"),
					description: error.message,
				})
			} else {
				console.log(error)
			}
		}
	}

	return (
		<Stack align="center" spacing="3">
			<Avatar size="2xl" {...avatarProps} src={avatarUrl} role="group" position="relative">
				<AvatarBadge borderWidth="2px" borderColor="bg-surface" insetEnd="3" bottom="3" bg="bg-surface">
					<IconButton
						size="sm"
						icon={avatar ? <FiCheck fontSize="18" /> : <FiEdit2 />}
						aria-label="change-avatar"
						rounded="full"
						colorScheme={avatar ? "green" : "purple"}
						onClick={avatar ? onSaveClick : onInputClick}
						isLoading={isLoading}
					/>
					<Input id="avatar" accept={acceptString} type="file" hidden ref={inputRef} onChange={onInputChange} />
				</AvatarBadge>
			</Avatar>
			{avatar && (
				<Button variant="link" colorScheme="orange" size="sm" onClick={onResetClick}>
					Reset changes
				</Button>
			)}
		</Stack>
	)
}

export default ChangeUserAvatar
