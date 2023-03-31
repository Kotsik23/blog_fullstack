import { Button, Stack } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import FileInput from "components/FileInput/FileInput"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { SUPPORTED_FORMATS } from "shared/constants/files"
import { changeAvatarSchema } from "./schema"
import { ChangeAvatarFields } from "./types"

const ChangeAvatar = () => {
	const {
		control,
		reset,
		handleSubmit,
		formState: { isDirty },
	} = useForm<ChangeAvatarFields>({
		mode: "all",
		resolver: yupResolver(changeAvatarSchema),
	})

	const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)

	const onCancelHandler = () => {
		reset()
		setImageUrl(undefined)
	}

	const onSubmitHandler: SubmitHandler<ChangeAvatarFields> = data => {
		console.log(data)
	}

	return (
		<Stack spacing="6">
			<SectionHeader description="Будет отображаться в шапке профиля и при публикациях">
				Изображение профиля
			</SectionHeader>

			<FileInput
				name="avatar"
				control={control}
				imageUrl={imageUrl}
				setImageUrl={setImageUrl}
				accept={SUPPORTED_FORMATS}
			/>

			<Stack direction={{ base: "column", md: "row" }} spacing="3" alignSelf={{ md: "flex-end" }}>
				<Button variant="outline" onClick={onCancelHandler} isDisabled={!isDirty}>
					Отмена
				</Button>
				<Button colorScheme="purple" onClick={handleSubmit(onSubmitHandler)}>
					Сохранить изменения
				</Button>
			</Stack>
		</Stack>
	)
}

export default ChangeAvatar
