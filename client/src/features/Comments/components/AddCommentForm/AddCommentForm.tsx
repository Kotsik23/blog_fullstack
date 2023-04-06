import {
	Button,
	Flex,
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
	Input,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { commentsApi } from "features/Comments/api/comments"
import { CreateCommentPayload } from "features/Comments/types/comment.interface"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { TOAST_DEFAULT_OPTIONS } from "shared/constants/toast"
import { createCommentSchema } from "./schema"

const AddCommentForm = () => {
	const { t } = useTranslation()
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateCommentPayload>({
		resolver: yupResolver(createCommentSchema),
	})

	const { id } = useParams()
	const toast = useToast(TOAST_DEFAULT_OPTIONS)
	const [create, { isLoading }] = commentsApi.useCreateCommentMutation()

	const onSubmit: SubmitHandler<CreateCommentPayload> = async data => {
		try {
			await create({
				body: data.body,
				id: +id!,
			}).unwrap()
			toast({
				status: "success",
				title: t("toast.success"),
				description: t("toast.addComment"),
			})
			reset()
		} catch (error) {
			console.log(error)
			toast({
				status: "error",
				title: t("toast.badRequest"),
			})
		}
	}

	const primaryColor = useColorModeValue("purple.500", "purple.200")

	return (
		<Flex
			as="form"
			align="center"
			gap="4"
			direction={{ base: "column", md: "row" }}
			onSubmit={handleSubmit(onSubmit)}
		>
			<FormControl isInvalid={!!errors.body}>
				<Input
					placeholder={t("comment.placeholder")!}
					focusBorderColor={primaryColor}
					{...register("body")}
					size="lg"
				/>
				<FormErrorMessage>
					<FormErrorIcon />
					{errors.body?.message}
				</FormErrorMessage>
			</FormControl>
			<Button
				variant="solid"
				colorScheme="purple"
				w={{ base: "full", md: "max-content" }}
				isLoading={isLoading}
				size="lg"
				type="submit"
			>
				{t("comment.add")}
			</Button>
		</Flex>
	)
}

export default AddCommentForm
