export const toolbarOptions = {
	options: ["inline", "blockType", "fontSize", "list", "remove", "history"],
	inline: {
		inDropdown: false,
		className: "inline",
		options: ["bold", "italic", "underline", "strikethrough"],
	},
	blockType: {
		inDropdown: true,
		options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote"],
	},
	fontSize: {
		options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
		className: "font-size",
		dropdownClassName: "font-size-dropdown",
	},
	list: {
		inDropdown: false,
		options: ["unordered", "ordered"],
	},
	remove: { className: undefined, component: undefined },
	history: {
		inDropdown: false,
		options: ["undo", "redo"],
	},
}
