import { Button, Flex, Icon, Image, Input, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { SUPPORTED_FORMATS } from "shared/constants/files"
import { FileInputProps } from "./FileInput.props"
import { IoCloudUploadOutline } from "react-icons/io5"
import { BsX } from "react-icons/bs"
import { useTranslation } from "react-i18next"

const FileInput = ({ name, accept = SUPPORTED_FORMATS }: FileInputProps) => {
	const {
		register,
		setValue,
		getValues,
		formState: { errors },
		trigger,
	} = useFormContext()

	const stringAccept = accept.join(", ")

	useEffect(() => {
		const defaultPreview = getValues(name)
		if (typeof defaultPreview === "string") {
			setPreviewUrl(defaultPreview)
		}
	}, [getValues(name)])

	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const { t } = useTranslation()

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
			<Input id={name} type="file" accept={stringAccept} hidden {...register(name)} onChange={onFileChange} />
			<Button
				onClick={onUploadClick}
				p="2rem"
				h="full"
				w="full"
				colorScheme={errors.file ? "red" : "gray"}
				variant="outline"
				flex="1"
			>
				{previewUrl && getValues(name) ? (
					<Stack align="center" spacing="3">
						<Image
							src={previewUrl}
							alt={name}
							objectFit="cover"
							maxW="full"
							maxH="250px"
							rounded="lg"
							shadow="md"
						/>
						<Text fontSize="lg" fontWeight="semibold">
							{(getValues(name) as File).name}
						</Text>
					</Stack>
				) : (
					<Stack spacing="3" align="center">
						<Icon as={errors.file ? BsX : IoCloudUploadOutline} boxSize="10" />
						<Text fontSize="lg">{errors.file ? (errors.file.message as string) : t("fileInput.text")}</Text>
						<Text as="span" fontWeight="normal" textTransform="uppercase">
							{accept.map(item => item.replace("image/", "")).join(", ")}
						</Text>
					</Stack>
				)}
			</Button>
		</Flex>
	)
}

export default FileInput
