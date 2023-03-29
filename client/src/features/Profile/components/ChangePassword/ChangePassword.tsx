import { Button, Divider, Stack, useColorModeValue, useToast } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import CustomInput from "components/CustomInput/CustomInput"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { IAuthError } from "features/Auth/types/auth.interface"
import { profileApi } from "features/Profile/api/profile"
import { SubmitHandler, useForm } from "react-hook-form"
import { TOAST_DEFAULT_OPTIONS } from "shared/constants/toast"
import { confirmationSchema } from "./schema"
import { ChangePasswordFields } from "./types"

const ChangePassword = () => {
	const {
		control,
		reset,
		handleSubmit,
		formState: { isDirty },
	} = useForm<ChangePasswordFields>({
		resolver: yupResolver(confirmationSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	})

	const toast = useToast(TOAST_DEFAULT_OPTIONS)
	const [update, { isLoading }] = profileApi.useUpdateProfileMutation()

	const onSubmitHandler: SubmitHandler<ChangePasswordFields> = async data => {
		try {
			await update({
				oldPassword: data.currentPassword,
				password: data.newPassword,
			}).unwrap()
			toast({
				status: "success",
				title: "Успешно",
				description: "Вы успешно изменили свой пароль",
			})
			reset()
		} catch (error) {
			toast({
				title: (error as IAuthError).data.error || "Bad request",
				description: (error as IAuthError).data.message && (error as IAuthError).data.message,
				status: "error",
			})
		}
	}

	const primary = useColorModeValue("purple.500", "purple.200")

	return (
		<Stack spacing="6">
			<SectionHeader description="Пожалуйста, введите ваш старый пароль, чтобы изменить его на новый">
				Пароль
			</SectionHeader>

			<Stack spacing={{ base: "5", md: "8" }} divider={<Divider />} maxW="container.md">
				<CustomInput
					control={control}
					name="currentPassword"
					title="Текущий пароль"
					focusBorderColor={primary}
					type="password"
				/>

				<CustomInput
					control={control}
					name="newPassword"
					title="Новый пароль"
					placeholder="••••••"
					focusBorderColor={primary}
					type="password"
				/>

				<CustomInput
					control={control}
					name="confirmNewPassword"
					title="Подвтерждение нового пароля"
					placeholder="••••••"
					focusBorderColor={primary}
					type="password"
				/>
			</Stack>
			<Stack direction={{ base: "column", md: "row" }} spacing="3" alignSelf={{ md: "flex-end" }}>
				<Button variant="outline" onClick={() => reset()} isDisabled={isDirty}>
					Отмена
				</Button>
				<Button colorScheme="purple" onClick={handleSubmit(onSubmitHandler)} isLoading={isLoading}>
					Сохранить изменения
				</Button>
			</Stack>
		</Stack>
	)
}

export default ChangePassword
