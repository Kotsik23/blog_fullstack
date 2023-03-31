import { Button, Divider, FormControl, FormLabel, Input, Stack, useColorModeValue, useToast } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import CustomInput from "components/CustomInput/CustomInput"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { IAuthError } from "features/Auth/types/auth.interface"
import { profileApi } from "features/Profile/api/profile"
import { SubmitHandler, useForm } from "react-hook-form"
import { TOAST_DEFAULT_OPTIONS } from "shared/constants/toast"
import { useAppSelector } from "shared/utils/redux"
import { changeEmailSchema } from "./schema"
import { ChangeEmailFields } from "./types"

const ChangeEmail = () => {
	const user = useAppSelector(state => state.auth.user)

	const {
		control,
		reset,
		handleSubmit,
		formState: { isDirty },
	} = useForm<ChangeEmailFields>({
		resolver: yupResolver(changeEmailSchema),
		defaultValues: {
			currentEmail: user?.email,
			newEmail: "",
		},
	})

	const toast = useToast(TOAST_DEFAULT_OPTIONS)
	const [update, { isLoading }] = profileApi.useUpdateProfileMutation()

	const onSubmitHandler: SubmitHandler<ChangeEmailFields> = async data => {
		try {
			await update({
				email: data.newEmail,
			}).unwrap()
			toast({
				status: "success",
				title: "Успешно",
				description: "Вы успешно изменили свой e-mail",
			})
			reset({
				currentEmail: data.newEmail,
			})
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
			<SectionHeader>E-mail</SectionHeader>

			<Stack spacing={{ base: "5", md: "8" }} divider={<Divider />} maxW="container.md">
				<CustomInput
					control={control}
					name="currentEmail"
					title="Текущий адрес e-mail"
					focusBorderColor={primary}
					type="email"
					isReadOnly
				/>

				<CustomInput
					control={control}
					name="newEmail"
					title="Новый адрес e-mail"
					focusBorderColor={primary}
					type="email"
				/>
			</Stack>

			<Stack direction={{ base: "column", md: "row" }} spacing="3" alignSelf={{ md: "flex-end" }}>
				<Button variant="outline" onClick={() => reset()} isDisabled={!isDirty}>
					Отмена
				</Button>
				<Button colorScheme="purple" onClick={handleSubmit(onSubmitHandler)} isLoading={isLoading}>
					Сохранить изменения
				</Button>
			</Stack>
		</Stack>
	)
}

export default ChangeEmail