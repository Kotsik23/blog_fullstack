import { Stack } from "@chakra-ui/react"
import { ProfileChangePassword, ProfileHeader } from "features/Profile"

const ProfilePage = () => {
	return (
		<Stack spacing="12">
			<ProfileHeader />
			<ProfileChangePassword />
		</Stack>
	)
}

export default ProfilePage
