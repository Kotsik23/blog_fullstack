import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { authApi } from "../../store/api/auth.api"
import { IAuthFormProps } from "./AuthForm.types"
import { yupResolver } from "@hookform/resolvers/yup"
import { authScheme } from "./auth.scheme"
import { IAuthFields, IAuthError } from "../../shared/types/auth.interface"
import { Link as NavLink } from "react-router-dom"
import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Stack,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"
import PasswordField from "./PasswordField/PasswordField"
import { ROUTES } from "../../constants/routes.constants"

const AuthForm: FC<IAuthFormProps> = ({ type }) => {
	const {
		register: registerField,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IAuthFields>({
		mode: "all",
		resolver: yupResolver(authScheme),
	})

	const toast = useToast({
		isClosable: true,
		duration: 4000,
		position: "top-right",
		variant: "solid",
	})
	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from.pathname

	const [login, { isLoading: isLoginLoading }] = authApi.useLoginMutation()
	const [register, { isLoading: isRegisterLoading }] = authApi.useRegisterMutation()

	const isLogin = type === "login"

	const onSubmitHandler: SubmitHandler<IAuthFields> = async data => {
		try {
			isLogin ? await login(data).unwrap() : await register(data).unwrap()
			toast({
				title: "Успешно",
				description: isLogin ? "Вы успешно зашли в систему" : "Аккаунт успешно создан",
				status: "success",
			})
			reset()
			navigate(from || ROUTES.MAIN)
		} catch (error) {
			console.log(error)
			toast({
				title: (error as IAuthError).data.error,
				description: (error as IAuthError).data.message,
				status: "error",
			})
		}
	}

	const primary = useColorModeValue("purple.500", "purple.200")

	return (
		<Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
			<Stack spacing="8">
				<Stack spacing="6">
					<Stack spacing={{ base: "2", md: "3" }} textAlign="center">
						<Heading size={{ base: "xs", md: "lg" }}>{isLogin ? "Вход в систему" : "Создание аккаунта"}</Heading>
						<HStack spacing="1" justify="center">
							<Text color="muted">{isLogin ? "Еще нет аккаунта?" : "Уже есть аккаунт?"}</Text>
							<Button
								variant="link"
								colorScheme="purple"
								as={NavLink}
								to={isLogin ? ROUTES.REGISTER : ROUTES.LOGIN}
							>
								{isLogin ? "Создание аккаунта" : "Вход в систему"}
							</Button>
						</HStack>
					</Stack>
				</Stack>
				<Box
					py={{ base: "0", sm: "8" }}
					px={{ base: "4", sm: "10" }}
					bg={{ base: "transparent", sm: "bg-surface" }}
					boxShadow={{ base: "none", sm: "xl" }}
					borderRadius={{ base: "none", sm: "xl" }}
				>
					<Stack spacing="6">
						<Stack spacing="5">
							<FormControl>
								<FormLabel htmlFor="email">E-mail</FormLabel>
								<Input id="email" type="email" focusBorderColor={primary} {...registerField("email")} />
							</FormControl>
							<PasswordField {...registerField("password")} />
						</Stack>
						<HStack justify="space-between">
							<Checkbox defaultChecked={false} colorScheme="purple">
								Запомнить меня
							</Checkbox>
							<Button variant="link" colorScheme="purple" size="sm">
								Забыли пароль?
							</Button>
						</HStack>
						<Button
							variant="solid"
							colorScheme="purple"
							isLoading={isLoginLoading || isRegisterLoading}
							onClick={handleSubmit(onSubmitHandler)}
						>
							{isLogin ? "Войти" : "Зарегистрироваться"}
						</Button>
					</Stack>
				</Box>
			</Stack>
		</Container>
	)
}

export default AuthForm
