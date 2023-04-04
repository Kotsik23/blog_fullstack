import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import FileInput from "components/FileInput/FileInput"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { schema } from "./schema"
import { CreatePostFields } from "./types"

const CreateForm = () => {
	const methods = useForm<CreatePostFields>({
		resolver: yupResolver(schema),
		defaultValues: {
			file: null,
			title: "",
		},
	})

	const { handleSubmit, register, reset, formState } = methods

	const onSubmit: SubmitHandler<CreatePostFields> = async data => {
		console.log(data)
	}

	const primaryColor = useColorModeValue("purple.500", "purple.200")
	return (
		<FormProvider {...methods}>
			<Stack as="form" spacing="6">
				<FormControl isInvalid={!!formState.errors.title}>
					<FormLabel htmlFor="title" fontSize="xl">
						Заголовок
					</FormLabel>
					<Input
						id="title"
						placeholder="Как побороть свои..."
						focusBorderColor={primaryColor}
						size="lg"
						{...register("title")}
					/>
					<FormErrorMessage>{formState.errors.title?.message}</FormErrorMessage>
				</FormControl>

				<FileInput name="file" />

				<Flex gap={{ base: 2, md: 4 }} alignSelf={{ md: "flex-end" }} direction={{ base: "column", md: "row" }}>
					<Button variant="solid" colorScheme="purple" onClick={handleSubmit(onSubmit)}>
						Сохранить
					</Button>
					<Button variant="outline" colorScheme="gray" onClick={() => reset()}>
						Очистить
					</Button>
				</Flex>
			</Stack>
		</FormProvider>
	)
}

export default CreateForm
