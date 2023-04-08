import { Stack } from "@chakra-ui/react"
import { ProfileChangeEmail, ProfileChangePassword, ProfileHeader } from "features/Profile"

const ProfilePage = () => {
	return (
		<Stack spacing="12">
			<ProfileHeader />
			<ProfileChangePassword />
			<ProfileChangeEmail />
		</Stack>
	)
}

export default ProfilePage
