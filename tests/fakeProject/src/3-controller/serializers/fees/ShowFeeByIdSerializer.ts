import { Validatable } from '@serverless/common/lib/3-controller/serializers/abstractValidatable'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { OutputShowFeeByIdDto } from '@business/dtos/fees/ShowFeeByIdDto'

export class InputShowFeeById extends Validatable<InputShowFeeById> {
  @IsNotEmpty()
  @IsNumber()
  id!: number
}

export type OutputShowFeeById = OutputShowFeeByIdDto
