import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import * as cookieParser from "cookie-parser"
import { PrismaClientKnowRequestErrorFilter } from "./filters/PrismaClientKnowRequestErrorFilter"

async function bootstrap() {
	const PORT = process.env.PORT || 8001

	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix("api")
	app.enableCors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
	app.use(cookieParser())
	app.useGlobalPipes(new ValidationPipe())
	app.useGlobalFilters(new PrismaClientKnowRequestErrorFilter())

	await app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`))
}

bootstrap()
