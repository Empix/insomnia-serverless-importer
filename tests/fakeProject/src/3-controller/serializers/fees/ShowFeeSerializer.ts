import { Validatable } from '@serverless/common/lib/3-controller/serializers/abstractValidatable'
import { IsNotEmpty, IsString } from 'class-validator'
import { OutputShowFeeDto } from '@business/dtos/fees/ShowFeeDto'

export class InputShowFee extends Validatable<InputShowFee> {
  @IsNotEmpty()
  @IsString()
  shortName!: string
}

export type OutputShowFee = OutputShowFeeDto
