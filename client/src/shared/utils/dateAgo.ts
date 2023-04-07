import { formatDistanceToNow } from "date-fns"
import { ru, enUS } from "date-fns/locale"
import i18next from "../../app/i18n"

export const dateAgo = (date: Date) => {
	const locale = i18next.language === "ru" ? ru : enUS
	return formatDistanceToNow(date, {
		addSuffix: true,
		locale,
	})
}
