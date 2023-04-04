import { Button, Flex, Icon, Image, Input, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { SUPPORTED_FORMATS } from "shared/constants/files"
import { FileInputProps } from "./FileInput.props"
import { IoCloudUploadOutline } from "react-icons/io5"
import { BsX } from "react-icons/bs"

const FileInput = ({ name, accept = SUPPORTED_FORMATS }: FileInputProps) => {
	const {
		register,
		setValue,
		getValues,
		formState: { errors },
		trigger,
	} = useFormContext()

	const stringAccept = accept.join(", ")

	const [previewUrl, setPreviewUrl] = useState<string | null>(null)

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (files) {
			const file = files[0]
			const url = URL.createObjectURL(file)
			setPreviewUrl(url)
			setValue(name, file)
			trigger(name)
		} else {
			setPreviewUrl(null)
			setValue(name, null)
			trigger(name)
		}
	}

	const onUploadClick = () => {
		document.getElementById(name)?.click()
	}

	return (
		<Flex align="center" justify="center" gap="6" direction={{ base: "column-reverse", md: "row" }}>
			{previewUrl && getValues(name) && (
				<Stack align="center" spacing="3">
					<Image src={previewUrl} alt={name} objectFit="cover" maxW="full" maxH="190px" rounded="lg" shadow="md" />
					<Text fontSize="lg" fontWeight="semibold">
						{(getValues(name) as File).name}
					</Text>
				</Stack>
			)}
			<Input id={name} type="file" accept={stringAccept} hidden {...register(name)} onChange={onFileChange} />
			<Button
				onClick={onUploadClick}
				p="4rem"
				h="full"
				w="full"
				colorScheme={errors.file ? "red" : "gray"}
				variant="outline"
				flex="1"
			>
				<Stack spacing="3" align="center">
					<Icon as={errors.file ? BsX : IoCloudUploadOutline} boxSize="10" />
					<Text fontSize="lg">{errors.file ? (errors.file.message as string) : "Нажмите для загрузки"}</Text>
					<Text as="span" fontWeight="normal" textTransform="uppercase">
						{accept.map(item => item.replace("image/", "")).join(", ")}
					</Text>
				</Stack>
			</Button>
		</Flex>
	)
}

export default FileInput
