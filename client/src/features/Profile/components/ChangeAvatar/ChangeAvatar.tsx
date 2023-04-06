import { Button, Stack, useToast } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import FileInput from "components/FileInput/FileInput"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { profileApi } from "features/Profile/api/profile"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { TOAST_DEFAULT_OPTIONS } from "shared/constants/toast"
import { changeAvatarSchema } from "./schema"
import { ChangeAvatarFields } from "./types"

const ChangeAvatar = () => {
	const { t } = useTranslation()
	const methods = useForm<ChangeAvatarFields>({
		resolver: yupResolver(changeAvatarSchema),
		defaultValues: {
			avatar: null,
		},
	})

	const toast = useToast(TOAST_DEFAULT_OPTIONS)
	const [update, { isLoading }] = profileApi.useUpdateProfileAvatarMutation()

	const onSubmit: SubmitHandler<ChangeAvatarFields> = async data => {
		try {
			const formData = new FormData()
			formData.append("image", data.avatar!)

			await update(formData).unwrap()
			toast({
				status: "success",
				title: t("toast.success"),
				description: t("toast.updateAvatar"),
			})
			methods.reset()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<SectionHeader description={t("updateAvatar.description")!}>{t("updateAvatar.heading")}</SectionHeader>

			<FormProvider {...methods}>
				<Stack spacing="6" as="form">
					<FileInput name="avatar" />

					<Stack direction={{ base: "column", md: "row" }} spacing="3" alignSelf={{ md: "flex-end" }}>
						<Button variant="outline" onClick={() => methods.reset()} isDisabled={!methods.getValues("avatar")}>
							{t("updateAvatar.cancel")}
						</Button>
						<Button colorScheme="purple" onClick={methods.handleSubmit(onSubmit)} isLoading={isLoading}>
							{t("updateAvatar.save")}
						</Button>
					</Stack>
				</Stack>
			</FormProvider>
		</>
	)
}

export default ChangeAvatar
