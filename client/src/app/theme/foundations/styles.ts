import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools"

const styles = {
	global: (props: StyleFunctionProps) => ({
		body: {
			color: "default",
			bg: "bg-canvas",
		},
		"*::placeholder": {
			opacity: 1,
			color: mode("gray.400", "gray.500")(props),
		},
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
