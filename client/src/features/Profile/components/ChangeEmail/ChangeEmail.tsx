import { Button, Divider, Stack, useColorModeValue, useToast } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import CustomInput from "components/CustomInput/CustomInput"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { profileApi } from "features/Profile/api/profile"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { TOAST_DEFAULT_OPTIONS } from "shared/constants/toast"
import { ApiError } from "shared/types/error"
import { useAppSelector } from "shared/utils/redux"
import { changeEmailSchema } from "./schema"
import { ChangeEmailFields } from "./types"

const ChangeEmail = () => {
	const { t } = useTranslation()
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
				title: t("toast.success"),
				description: t("toast.updateEmail"),
			})
			reset({
				currentEmail: data.newEmail,
			})
		} catch (error) {
			toast({
				title: (error as ApiError).data.error || "Bad request",
				description: (error as ApiError).data.message && (error as ApiError).data.message,
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
					title={t("updateEmail.oldEmail")}
					focusBorderColor={primary}
					type="email"
					isReadOnly
				/>

				<CustomInput
					control={control}
					name="newEmail"
					title={t("updateEmail.newEmail")}
					focusBorderColor={primary}
					type="email"
				/>
			</Stack>

			<Stack direction={{ base: "column", md: "row" }} spacing="3" alignSelf={{ md: "flex-end" }}>
				<Button variant="outline" onClick={() => reset()} isDisabled={!isDirty}>
					{t("updateEmail.cancel")}
				</Button>
				<Button colorScheme="purple" onClick={handleSubmit(onSubmitHandler)} isLoading={isLoading}>
					{t("updateEmail.save")}
				</Button>
			</Stack>
		</Stack>
	)
}

export default ChangeEmail
