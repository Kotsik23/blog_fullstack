import { ROUTES } from "shared/constants/routes"

interface IMenuItem {
	id: number
	text: string
	link: string
}

export const MenuItems: IMenuItem[] = [
	{
		id: 1,
		text: "links.main",
		link: ROUTES.MAIN,
	},
	{
		id: 2,
		text: "links.news",
		link: ROUTES.POSTS,
	},
]
