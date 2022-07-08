import { Validatable } from '@serverless/common/lib/3-controller/serializers/abstractValidatable'
import { IsNotEmpty, IsNumberString } from 'class-validator'
import { OutputDeleteFeesDto } from '@business/dtos/fees/DeleteFeesDto'

export class InputDeleteFees extends Validatable<InputDeleteFees> {
  @IsNotEmpty()
  @IsNumberString()
  id!: number
}

export type OutputDeleteFees = OutputDeleteFeesDto
