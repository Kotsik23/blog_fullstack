import { Avatar, Flex, Box, IconButton, Stack, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import { commentsApi } from "features/Comments/api/comments"
import { useTranslation } from "react-i18next"
import { MdDelete } from "react-icons/md"
import { ROLES } from "shared/constants/roles"
import { TOAST_DEFAULT_OPTIONS } from "shared/constants/toast"
import { checkAccessByRole } from "shared/utils/checkAccessByRole"
import { dateAgo } from "shared/utils/dateAgo"
import { useAppSelector } from "shared/utils/redux"
import { CommentItemProps } from "./CommentItem.props"

const CommentItem = ({ comment }: CommentItemProps) => {
	const { t } = useTranslation()
	const [deleteComment, { isLoading }] = commentsApi.useDeleteCommentMutation()
	const toast = useToast(TOAST_DEFAULT_OPTIONS)
	const user = useAppSelector(state => state.auth.user)

	const isAuthor = comment.userId === user?.id
	const isAccessByRole = checkAccessByRole(user, [ROLES.ADMIN, ROLES.MANAGER])

	const onDeleteClick = async () => {
		try {
			await deleteComment(comment.id).unwrap()
			toast({
				status: "info",
				title: t("toast.success"),
				description: t("toast.deleteComment"),
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Flex justify="space-between" p="4" rounded="md" boxShadow="md" bg={useColorModeValue("gray.50", "gray.800")}>
			<Flex align="center" gap={{ base: "3", md: "6" }} direction={{ base: "column", md: "row" }}>
				<Avatar size="md" src={comment.user.avatarUrl} alignSelf="flex-start" />
				<Stack spacing={{ base: "4", md: "2" }}>
					<Flex gap={{ base: 1, md: 3 }} align={{ md: "center" }} direction={{ base: "column", md: "row" }}>
						<Text size="sm" fontWeight="medium">
							{comment.user.email}
						</Text>
						<Text color="muted">{dateAgo(new Date(comment.createdAt))}</Text>
					</Flex>
					<Text>{comment.body}</Text>
				</Stack>
			</Flex>
			{(isAuthor || isAccessByRole) && (
				<IconButton
					size="sm"
					icon={<MdDelete />}
					aria-label="delete-comment"
					variant="outline"
					colorScheme="red"
					onClick={onDeleteClick}
					isLoading={isLoading}
				/>
			)}
		</Flex>
	)
}

export default CommentItem
