import { HStack, Button, IconButton } from "@chakra-ui/react"
import { PaginationProps } from "./Pagination.props"
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons"
import { useLocation, useSearchParams } from "react-router-dom"

const Pagination = ({ currentPage, onPageChange, totalPages }: PaginationProps) => {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

	const location = useLocation()
	const [, setSearchParams] = useSearchParams(new URLSearchParams(location.search))

	const handlePageChange = (page: number) => {
		onPageChange(page)
		setSearchParams({ page: String(page) })
	}

	return (
		<HStack>
			<IconButton
				aria-label="prev-page"
				icon={<ChevronLeftIcon />}
				isDisabled={currentPage <= 1}
				onClick={() => handlePageChange(currentPage - 1)}
			/>
			{pages.map(page => (
				<Button
					key={page}
					onClick={() => handlePageChange(page)}
					colorScheme={page === currentPage ? "purple" : "gray"}
				>
					{page}
				</Button>
			))}
			<IconButton
				aria-label="next-page"
				icon={<ChevronRightIcon />}
				isDisabled={currentPage >= totalPages}
				onClick={() => handlePageChange(currentPage + 1)}
			/>
		</HStack>
	)
}

export default Pagination
