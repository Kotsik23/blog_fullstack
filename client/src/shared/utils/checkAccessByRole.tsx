import { ROLES } from "shared/constants/roles"
import { IUser } from "shared/types/user"

export const checkAccessByRole = (user: IUser | null | undefined, roles: ROLES[]) => {
	if (!user) return false
	return roles.some(role => user.roles.includes(role))
}
