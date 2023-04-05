import { EditorState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { Stack, Text } from "@chakra-ui/react"
import "./styles.css"
import { Controller, useFormContext } from "react-hook-form"
import { TextEditorProps } from "./TextEditor.props"
import { convertToHTML } from "draft-convert"
import { toolbarOptions } from "./config"

const TextEditor = ({ name, editorState, setEditorState }: TextEditorProps) => {
	const { control } = useFormContext()

	return (
		<Stack>
			<Text fontSize="xl" fontWeight="medium">
				Содержание
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
						placeholder="Напишите что-нибудь..."
						stripPastedStyles
					/>
				)}
			/>
		</Stack>
	)
}

export default TextEditor
