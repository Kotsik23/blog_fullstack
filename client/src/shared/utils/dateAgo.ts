import { formatDistanceToNow } from "date-fns"
import { ru } from "date-fns/locale"

export const dateAgo = (date: Date) => {
	return formatDistanceToNow(date, {
		addSuffix: true,
		locale: ru,
	})
}
