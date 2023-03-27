import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link as NavLink } from "react-router-dom"
import {
	Box,
	Button,
	Center,
	Checkbox,
	Container,
	Heading,
	HStack,
	Stack,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"
import { IAuthError, IAuthFields } from "../../shared/types/auth.interface"
import { authScheme } from "../../shared/schema/auth.scheme"
import { IAuthFormProps } from "../../shared/types/AuthForm.types"
import { authApi } from "../../../../store/api/auth.api"
import { ROUTES } from "../../../../constants/routes.constants"
import CustomInput from "../../../../components/CustomInput/CustomInput"
import { TOAST_DEFAULT_OPTIONS } from "../../../../constants/toast.constants"

const AuthForm = ({ type }: IAuthFormProps) => {
	const {
		register: registerField,
		reset,
		handleSubmit,
		control,
	} = useForm<IAuthFields>({
		mode: "onTouched",
		resolver: yupResolver(authScheme),
		defaultValues: {
			email: "",
			password: "",
			isRemember: false,
		},
	})

	const toast = useToast(TOAST_DEFAULT_OPTIONS)
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
			toast({
				title: (error as IAuthError).data.error || "Bad request",
				description: (error as IAuthError).data.message && (error as IAuthError).data.message,
				status: "error",
			})
		}
	}

	const primary = useColorModeValue("purple.500", "purple.200")

	return (
		<Center>
			<Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
				<Stack spacing="8">
					<Stack spacing={{ base: "2", md: "3" }} textAlign="center">
						<Heading size="lg">{isLogin ? "Вход в систему" : "Создание аккаунта"}</Heading>
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
					<Box
						py={{ base: "0", sm: "8" }}
						px={{ base: "4", sm: "10" }}
						bg={{ base: "transparent", sm: "bg-surface" }}
						boxShadow={{ base: "none", sm: "lg-custom" }}
						borderRadius={{ base: "none", sm: "xl" }}
					>
						<Stack spacing="6">
							<Stack spacing="5">
								<CustomInput
									control={control}
									name="email"
									title="E-mail"
									type="email"
									placeholder="example@gmail.com"
									focusBorderColor={primary}
								/>
								<CustomInput
									control={control}
									name="password"
									title="Пароль"
									type="password"
									placeholder="••••••"
									focusBorderColor={primary}
								/>
							</Stack>
							<HStack justify={isLogin ? "space-between" : "flex-end"}>
								{isLogin && (
									<Checkbox defaultChecked={false} colorScheme="purple" {...registerField("isRemember")}>
										Запомнить меня
									</Checkbox>
								)}
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
		</Center>
	)
}

export default AuthForm
