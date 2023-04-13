import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link as NavLink } from "react-router-dom"
import {
	Box,
	Button,
	Center,
	Container,
	Heading,
	HStack,
	Stack,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"
import { IAuthFields } from "../../types/auth.interface"
import { authApi } from "features/Auth/api/auth"
import CustomInput from "components/CustomInput/CustomInput"
import { IAuthFormProps } from "./Auth.props"
import { TOAST_DEFAULT_OPTIONS } from "shared/constants/toast"
import { ROUTES } from "shared/constants/routes"
import { authScheme } from "./auth.scheme"
import { useTranslation } from "react-i18next"
import { ApiError } from "shared/types/error"

const Auth = ({ type }: IAuthFormProps) => {
	const { t } = useTranslation()
	const { reset, handleSubmit, control } = useForm<IAuthFields>({
		mode: "onTouched",
		resolver: yupResolver(authScheme),
		defaultValues: {
			email: "",
			password: "",
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
				title: t("toast.success"),
				description: isLogin ? t("toast.login") : t("toast.register"),
				status: "success",
			})
			reset()
			navigate(from || ROUTES.MAIN)
		} catch (error) {
			toast({
				title: (error as ApiError).data.error || "Bad request",
				description: (error as ApiError).data.message && (error as ApiError).data.message,
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
						<Heading size="lg">{isLogin ? t("auth.login") : t("auth.register")}</Heading>
						<HStack spacing="1" justify="center">
							<Text color="muted">{isLogin ? t("auth.noAccount") : t("auth.haveAccount")}</Text>
							<Button
								variant="link"
								colorScheme="purple"
								as={NavLink}
								to={isLogin ? ROUTES.REGISTER : ROUTES.LOGIN}
							>
								{isLogin ? t("auth.register") : t("auth.login")}
							</Button>
						</HStack>
					</Stack>
					<Box
						as="form"
						py={{ base: "0", sm: "8" }}
						px={{ base: "4", sm: "10" }}
						bg={{ base: "transparent", sm: "bg-surface" }}
						boxShadow={{ base: "none", sm: "lg-custom" }}
						borderRadius={{ base: "none", sm: "xl" }}
						onSubmit={handleSubmit(onSubmitHandler)}
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
									title={t("auth.password")}
									type="password"
									placeholder="••••••"
									focusBorderColor={primary}
								/>
							</Stack>
							<Button variant="link" colorScheme="purple" size="sm" alignSelf="flex-end">
								{t("auth.forgotPassword")}
							</Button>
							<Button
								variant="solid"
								colorScheme="purple"
								isLoading={isLoginLoading || isRegisterLoading}
								type="submit"
							>
								{isLogin ? t("auth.loginAction") : t("auth.registerAction")}
							</Button>
						</Stack>
					</Box>
				</Stack>
			</Container>
		</Center>
	)
}

export default Auth
