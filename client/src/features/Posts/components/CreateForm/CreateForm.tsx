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
import { convertToHTML } from "draft-convert"
import { EditorState } from "draft-js"
import { stateFromHTML } from "draft-js-import-html"
import { postsApi } from "features/Posts/api/posts"
import { useEffect, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { TOAST_DEFAULT_OPTIONS } from "shared/constants/toast"
import { ApiError } from "shared/types/error"
import TextEditor from "../TextEditor/TextEditor"
import { schema } from "./schema"
import { CreatePostFields } from "./types"

const CreateForm = () => {
	const { t } = useTranslation()
	const { id } = useParams()

	const isEdit = Boolean(id)

	const [getPost] = postsApi.useLazyGetPostByIdQuery()

	let defaultValues: CreatePostFields = {
		title: "",
		file: null,
		content: EditorState.createEmpty(),
	}

	const methods = useForm<CreatePostFields>({
		resolver: yupResolver(schema),
		defaultValues: defaultValues,
	})

	const [editorState, setEditorState] = useState<EditorState>(methods.getValues("content"))

	const { handleSubmit, register, reset, formState } = methods
	const toast = useToast(TOAST_DEFAULT_OPTIONS)
	const [addPost, { isLoading }] = postsApi.useAddPostMutation()
	const [updatePost, { isLoading: isUpdateLoading }] = postsApi.useUpdatePostMutation()

	useEffect(() => {
		const getPostData = async () => {
			try {
				const res = await getPost(id!).unwrap()
				const newContentState = stateFromHTML(res.content)
				const newEditorState = EditorState.createWithContent(newContentState)
				methods.setValue("title", res.title)
				methods.setValue("file", res.imageUrl)
				methods.setValue("content", newEditorState)
				setEditorState(newEditorState)
			} catch (error) {
				console.log(error)
			}
		}

		if (isEdit) {
			getPostData()
		}
	}, [getPost, id, isEdit, methods])

	const onSubmit: SubmitHandler<CreatePostFields> = async data => {
		try {
			const formData = new FormData()
			formData.append("title", data.title)
			if (data.content) {
				formData.append("content", convertToHTML(editorState.getCurrentContent()))
			}
			if (data.file instanceof File) {
				formData.append("image", data.file)
			}

			if (isEdit) {
				await updatePost({
					id: id!,
					data: formData,
				}).unwrap()
			} else {
				await addPost(formData).unwrap()
			}

			toast({
				status: "success",
				title: t("toast.success"),
				description: isEdit ? "Successfully updated" : t("toast.addPost"),
			})
			reset(defaultValues)
			setEditorState(EditorState.createEmpty())
		} catch (error) {
			toast({
				title: (error as ApiError).data.error || "Bad request",
				description: (error as ApiError).data.message && (error as ApiError).data.message,
				status: "error",
			})
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
						fontWeight="semibold"
						{...register("title")}
					/>
					<FormErrorMessage>{formState.errors.title?.message}</FormErrorMessage>
				</FormControl>

				<TextEditor name="content" editorState={editorState} setEditorState={setEditorState} />

				<FileInput name="file" />

				<Flex gap={{ base: 2, md: 4 }} alignSelf={{ md: "flex-end" }} direction={{ base: "column", md: "row" }}>
					<Button
						variant="solid"
						colorScheme="purple"
						onClick={handleSubmit(onSubmit)}
						isLoading={isLoading || isUpdateLoading}
					>
						{t("createPostForm.save")}
					</Button>
					<Button
						variant="outline"
						colorScheme="gray"
						onClick={() => {
							reset(defaultValues)
							setEditorState(EditorState.createEmpty())
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
