import { Box } from "@chakra-ui/react"
import styles from "./GlowingBalls.module.css"

const GlowingBalls = () => {
	return (
		<Box position="relative" top="10" left="4rem" zIndex="-1">
			<Box className={styles.purple} />
			<Box className={styles.yellow} />
			<Box className={styles.pink} />
		</Box>
	)
}

export default GlowingBalls
