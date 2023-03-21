import { ROUTES } from "../../constants/routes.constants"

interface IMenuItem {
	id: number
	text: string
	link: string
}

export const MenuItems: IMenuItem[] = [
	{
		id: 1,
		text: "Главная",
		link: ROUTES.MAIN,
	},
	{
		id: 2,
		text: "Новости",
		link: "/",
	},
	{
		id: 3,
		text: "Контакты",
		link: "/",
	},
	{
		id: 4,
		text: "Галерея",
		link: "/",
	},
]
