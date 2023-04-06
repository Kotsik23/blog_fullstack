import { EditorState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { Stack, Text } from "@chakra-ui/react"
import "./styles.css"
import { Controller, useFormContext } from "react-hook-form"
import { TextEditorProps } from "./TextEditor.props"
import { convertToHTML } from "draft-convert"
import { toolbarOptions } from "./config"
import { useTranslation } from "react-i18next"

const TextEditor = ({ name, editorState, setEditorState }: TextEditorProps) => {
	const { t } = useTranslation()
	const { control } = useFormContext()

	return (
		<Stack>
			<Text fontSize="xl" fontWeight="medium">
				{t("textEditor.heading")}
			</Text>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Editor
						editorState={editorState}
						onEditorStateChange={(editorState: EditorState) => {
							setEditorState(editorState)
							field.onChange(convertToHTML(editorState.getCurrentContent()))
						}}
						editorClassName="editor"
						toolbar={toolbarOptions}
						toolbarClassName="toolbar"
						placeholder={t("textEditor.placeholder")!}
						stripPastedStyles
					/>
				)}
			/>
		</Stack>
	)
}

export default TextEditor
