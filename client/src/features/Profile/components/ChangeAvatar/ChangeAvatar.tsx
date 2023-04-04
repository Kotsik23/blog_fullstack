import { Button, Stack } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import FileInput from "components/FileInput/FileInput"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { profileApi } from "features/Profile/api/profile"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { changeAvatarSchema } from "./schema"
import { ChangeAvatarFields } from "./types"

const ChangeAvatar = () => {
	const methods = useForm<ChangeAvatarFields>({
		resolver: yupResolver(changeAvatarSchema),
		defaultValues: {
			avatar: null,
		},
	})
	const [update, { isLoading }] = profileApi.useUpdateProfileAvatarMutation()

	const onSubmit: SubmitHandler<ChangeAvatarFields> = async data => {
		try {
			const formData = new FormData()
			formData.append("image", data.avatar!)

			const response = await update(formData).unwrap()
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<SectionHeader description="Будет отображаться в шапке профиля и при публикациях">
				Изображение профиля
			</SectionHeader>

			<FormProvider {...methods}>
				<Stack spacing="6" as="form">
					<FileInput name="avatar" />

					<Stack direction={{ base: "column", md: "row" }} spacing="3" alignSelf={{ md: "flex-end" }}>
						<Button variant="outline" onClick={() => methods.reset()} isDisabled={!methods.getValues("avatar")}>
							Отмена
						</Button>
						<Button colorScheme="purple" onClick={methods.handleSubmit(onSubmit)} isLoading={isLoading}>
							Сохранить изменения
						</Button>
					</Stack>
				</Stack>
			</FormProvider>
		</>
	)
}

export default ChangeAvatar
