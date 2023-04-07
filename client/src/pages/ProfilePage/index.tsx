import { Stack } from "@chakra-ui/react"
import { ProfileChangeAvatar, ProfileChangeEmail, ProfileChangePassword, ProfileHeader } from "features/Profile"

const ProfilePage = () => {
	return (
		<Stack spacing="12">
			<ProfileHeader />
			<ProfileChangePassword />
			<ProfileChangeEmail />
			<ProfileChangeAvatar />
		</Stack>
	)
}

export default ProfilePage
