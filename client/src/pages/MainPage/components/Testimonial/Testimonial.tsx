import { Box, SimpleGrid } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import TestimonialItem from "./TestimonialItem/TestimonialItem"

const Testimonial = () => {
	const { t } = useTranslation()
	return (
		<Box as="section" bg="bg-surface">
			<Box maxW={{ base: "xl", md: "7xl" }} mx="auto" px={{ base: "6", md: "8" }}>
				<SimpleGrid py="16" columns={{ base: 1, lg: 2 }} spacing={{ base: "16", lg: "32" }}>
					<TestimonialItem
						name={t("testimonial.first.name")}
						role={t("testimonial.first.role")}
						image="https://images.unsplash.com/photo-1571175351749-e8d06f275d85?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk0fHxsYWR5JTIwc21pbGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
					>
						{t("testimonial.first.body")}
					</TestimonialItem>
					<TestimonialItem
						name={t("testimonial.second.name")}
						role={t("testimonial.second.role")}
						image="https://images.unsplash.com/photo-1603987248955-9c142c5ae89b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fGhhbmRzb21lJTIwbWFuJTIwc21pbGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
					>
						{t("testimonial.second.body")}
					</TestimonialItem>
				</SimpleGrid>
			</Box>
		</Box>
	)
}

export default Testimonial
