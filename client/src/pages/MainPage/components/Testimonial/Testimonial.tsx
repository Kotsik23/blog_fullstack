import { Box, SimpleGrid } from "@chakra-ui/react"
import TestimonialItem from "./TestimonialItem/TestimonialItem"

const Testimonial = () => {
	return (
		<Box as="section" bg="bg-surface">
			<Box maxW={{ base: "xl", md: "7xl" }} mx="auto" px={{ base: "6", md: "8" }}>
				<SimpleGrid py="16" columns={{ base: 1, lg: 2 }} spacing={{ base: "16", lg: "32" }}>
					<TestimonialItem
						name="Анна Петрова"
						role="Журналист @ Редакция журнала Vogue"
						image="https://images.unsplash.com/photo-1571175351749-e8d06f275d85?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk0fHxsYWR5JTIwc21pbGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
					>
						Я стала поклонником этого блога с первых же строк. Такие честные и проникновенные мысли. Я всегда
						чувствую себя вдохновленной и позитивно настроенной после прочтения новой статьи. Спасибо, что
						делитесь своим миром с нами!
					</TestimonialItem>
					<TestimonialItem
						name="Дмитрий Иванов"
						role="Менеджер @ Крупная IT-компания"
						image="https://images.unsplash.com/photo-1603987248955-9c142c5ae89b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fGhhbmRzb21lJTIwbWFuJTIwc21pbGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
					>
						Нет ничего лучше, чем прочитать заметку, которая кажется написанной специально для тебя. Этот блог
						всегда дает мне толчок для размышлений и помогает оставаться вдохновленным. Благодарю, что помогаете
						нам любить чтение блогов!
					</TestimonialItem>
				</SimpleGrid>
			</Box>
		</Box>
	)
}

export default Testimonial
