import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools"

const styles = {
	global: (props: StyleFunctionProps) => ({
		"*, *::before, &::after": {
			borderColor: mode("gray.200", "gray.700")(props),
		},
		"html,body": {
			height: "100%",
		},
		"#__next, #root": {
			display: "flex",
			flexDirection: "column",
			minH: "100%",
		},
	}),
}

export default styles
