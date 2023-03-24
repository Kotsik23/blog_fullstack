import { format } from "date-fns"
import { ru } from "date-fns/locale"

export const formatDate = (date: Date) => {
	return format(new Date(date), "dd MMMM yyyy", { locale: ru })
}
