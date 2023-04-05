import { EditorState } from "draft-js"
import { Dispatch, SetStateAction } from "react"

export interface TextEditorProps {
	name: string
	editorState: EditorState
	setEditorState: Dispatch<SetStateAction<EditorState>>
}
