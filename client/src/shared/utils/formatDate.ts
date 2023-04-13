import { format } from "date-fns"
import { ru, enUS } from "date-fns/locale"
import i18next from "../../app/i18n"

export const formatDate = (date: Date | undefined) => {
	if (!date) {
		return
	}
	const locale = i18next.language === "ru" ? ru : enUS
	return format(new Date(date), "dd MMMM yyyy", { locale })
}
