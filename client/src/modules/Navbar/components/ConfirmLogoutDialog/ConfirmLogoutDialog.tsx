import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from "@chakra-ui/react"
import { useRef } from "react"
import { ConfirmLogoutProps } from "./ConfirmLogoutDialog.props"

const ConfirmLogoutDialog = ({ isOpen, isLoading, onClose, onClickHandler }: ConfirmLogoutProps) => {
	const cancelRef = useRef<HTMLButtonElement>(null)

	return (
		<AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="semibold">
						Подтверждение о выходе
					</AlertDialogHeader>

					<AlertDialogBody>Вы действительно хотите выйти из аккаунта?</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Отмена
						</Button>
						<Button colorScheme="red" onClick={onClickHandler} isLoading={isLoading} ml="3">
							Выйти
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}

export default ConfirmLogoutDialog
