import {
	Button,
	Flex,
	Icon,
	Input,
	Image,
	Text,
	useColorModeValue,
	VStack,
	FormControl,
	FormErrorMessage,
} from "@chakra-ui/react"
import { Controller } from "react-hook-form"
import { FileInputProps } from "./FileInput.props"
import { SUPPORTED_FORMATS } from "shared/constants/files"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { useRef } from "react"

const FILE_SIZE = 1 * 1024 * 1024 // 1 Mb

const FileInput = (props: FileInputProps) => {
	const { control, imageUrl, setImageUrl, name, accept = SUPPORTED_FORMATS } = props

	const acceptString = accept?.join(", ")

	const inputRef = useRef<HTMLInputElement>(null)

	const onButtonClickHandler = () => {
		inputRef.current?.click()
	}

	const borderColor = useColorModeValue("gray.300", "gray.600")
	const bgColor = useColorModeValue("blackAlpha.100", "whiteAlpha.300")

	return (
		<Controller
			name={name}
			control={control}
			rules={{
				validate: {
					fileSize: value => (value[0] as File).size < FILE_SIZE || "Размер файла должен быть меньше 1Мб",
					fileType: value => accept?.includes((value[0] as File).type) || "Неправильный формат файла",
				},
			}}
			render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
				<FormControl>
					<Flex gap="6" align="flex-start" justify="space-between">
						{imageUrl && <Image src={imageUrl} alt={imageUrl} boxSize="150" objectFit="cover" rounded="full" />}
						<Button
							colorScheme={"gray"}
							onClick={onButtonClickHandler}
							variant="ghost"
							border="2px solid"
							borderColor={borderColor}
							flex="1"
							h="100%"
							p="4"
						>
							<VStack spacing="3">
								<Icon
									as={AiOutlineCloudUpload}
									boxSize="3rem"
									color="primary"
									bg={bgColor}
									rounded="full"
									p="2"
								/>
								<Text fontSize="xl">{value?.name ? value?.name : "Click to upload"}</Text>
								<Text textTransform="uppercase" color="muted" fontSize="sm">
									{SUPPORTED_FORMATS.map(format => format.replace("image/", "")).join(", ")}
								</Text>
								<Text>{error?.message}</Text>
							</VStack>
						</Button>
						<Input
							type="file"
							// accept={acceptString}
							hidden
							ref={inputRef}
							onChange={event => {
								const files = event.target.files
								console.log(error)
								if (files && !error) {
									const fileUrl = URL.createObjectURL(files[0])
									setImageUrl(fileUrl)
									onChange(files[0])
								}
							}}
							onBlur={onBlur}
						/>
					</Flex>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	)
}

export default FileInput
