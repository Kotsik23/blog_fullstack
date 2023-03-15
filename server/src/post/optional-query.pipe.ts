import { Injectable, PipeTransform, ArgumentMetadata } from "@nestjs/common"

@Injectable()
export class OptionalQueryPipe implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {
		if (value === undefined) {
			return value
		} else {
			return Number(value)
		}
	}
}
