import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
	const PORT = process.env.PORT || 8001

	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix("api")
	app.enableCors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})

	app.useGlobalPipes(new ValidationPipe())

	await app.listen(PORT)
}
bootstrap()
