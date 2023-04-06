import i18next from "../../../../app/i18n"
import { IStat } from "./StatItem/StatItem.props"

export const stats: IStat[] = [
	{
		value: "12K+",
		label: i18next.t("stats.subscribers"),
	},
	{
		value: "88%",
		label: i18next.t("stats.emotions"),
	},
	{
		value: "15K+",
		label: i18next.t("stats.visitors"),
	},
]
