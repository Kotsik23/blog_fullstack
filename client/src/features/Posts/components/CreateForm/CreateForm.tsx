import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import FileInput from "components/FileInput/FileInput"
import { EditorState } from "draft-js"
import { postsApi } from "features/Posts/api/posts"
import { useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { TOAST_DEFAULT_OPTIONS } from "shared/constants/toast"
import TextEditor from "../TextEditor/TextEditor"
import { schema } from "./schema"
import { CreatePostFields } from "./types"

const defaultValues: CreatePostFields = {
	file: null,
	content: EditorState.createEmpty(),
	title: "",
}

const CreateForm = () => {
	const { t } = useTranslation()
	const methods = useForm<CreatePostFields>({
		resolver: yupResolver(schema),
		defaultValues,
	})

	const [editorState, setEditorState] = useState<EditorState>(defaultValues.content)

	const { handleSubmit, register, reset, formState } = methods
	const toast = useToast(TOAST_DEFAULT_OPTIONS)
	const [addPost, { isLoading }] = postsApi.useAddPostMutation()

	const onSubmit: SubmitHandler<CreatePostFields> = async data => {
		const formData = new FormData()
		formData.append("title", data.title)
		formData.append("content", data.content)
		formData.append("image", data.file)
		try {
			await addPost(formData).unwrap()
			toast({
				status: "success",
				title: t("toast.success"),
				description: t("toast.addPost"),
			})
			reset()
		} catch (error) {
			console.log(error)
		}
	}

	const primaryColor = useColorModeValue("purple.500", "purple.200")
	return (
		<FormProvider {...methods}>
			<Stack as="form" spacing="6">
				<FormControl isInvalid={!!formState.errors.title}>
					<FormLabel htmlFor="title" fontSize="xl">
						{t("createPostForm.title")}
					</FormLabel>
					<Input
						id="title"
						placeholder={t("createPostForm.placeholder")!}
						focusBorderColor={primaryColor}
						size="lg"
						{...register("title")}
					/>
					<FormErrorMessage>{formState.errors.title?.message}</FormErrorMessage>
				</FormControl>

				<TextEditor name="content" editorState={editorState} setEditorState={setEditorState} />

				<FileInput name="file" />

				<Flex gap={{ base: 2, md: 4 }} alignSelf={{ md: "flex-end" }} direction={{ base: "column", md: "row" }}>
					<Button variant="solid" colorScheme="purple" onClick={handleSubmit(onSubmit)} isLoading={isLoading}>
						{t("createPostForm.save")}
					</Button>
					<Button
						variant="outline"
						colorScheme="gray"
						onClick={() => {
							reset(defaultValues)
							setEditorState(defaultValues.content)
						}}
					>
						{t("createPostForm.clear")}
					</Button>
				</Flex>
			</Stack>
		</FormProvider>
	)
}

export default CreateForm
