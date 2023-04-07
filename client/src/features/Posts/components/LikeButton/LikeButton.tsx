import { Button, Flex, Icon, Text, useTheme, Stack } from "@chakra-ui/react"
import { postsApi } from "features/Posts/api/posts"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { useParams } from "react-router-dom"
import { IUser } from "shared/types/user"
import { useAppSelector } from "shared/utils/redux"
import { LikeButtonProps } from "./LikeButtonProps"

const LikeButton = ({ likes }: LikeButtonProps) => {
	const { t } = useTranslation()
	const theme = useTheme()

	const [postLikes, setPostLikes] = useState<IUser[]>(likes)
	const user = useAppSelector(state => state.auth.user)
	const { id } = useParams()
	const [toggleLike, { isLoading }] = postsApi.useToggleLikeMutation()

	const onCickHandler = async () => {
		try {
			const response = await toggleLike(+id!).unwrap()
			setPostLikes(response.likes)
		} catch (error) {
			console.log(error)
		}
	}

	const isLiked = postLikes.some(like => like.id === user?.id)

	return (
		<Flex align="center" justify="center" my={{ base: "8", md: "16" }} direction="column" gap="4">
			<Button
				variant={isLiked ? "solid" : "outline"}
				size="lg"
				p={{ base: "8", md: "12" }}
				w="full"
				maxW="container.md"
				colorScheme="pink"
				gap="4"
				boxShadow={`0 0 10px 3px ${theme.colors.pink[400]}`}
				isLoading={isLoading}
				onClick={onCickHandler}
			>
				<Icon as={isLiked ? BsHeartFill : BsHeart} fontSize={{ base: "2xl", md: "4xl" }} />
				<Stack>
					<Text fontSize={{ base: "md", md: "lg" }}>
						{isLiked ? t("likeButton.like") : t("likeButton.notLike")}
					</Text>
					<Text fontSize={{ base: "sm", md: "md" }} fontWeight="normal">
						{t("likeButton.alreadyLiked")} {postLikes.length}
					</Text>
				</Stack>
			</Button>
		</Flex>
	)
}

export default LikeButton
