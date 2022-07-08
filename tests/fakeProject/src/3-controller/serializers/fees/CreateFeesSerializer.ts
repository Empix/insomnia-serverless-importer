import { Validatable } from '@serverless/common/lib/3-controller/serializers/abstractValidatable'
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsInt } from 'class-validator'
import { PersonTypeEnum } from '@domain/entities/fees/FeesEntity'
import { OutputCreateFeesDto } from '@business/dtos/fees/CreateFeesDto'

export class InputCreateFees extends Validatable<InputCreateFees> {
  @IsNotEmpty()
  @IsString()
  description!: string

  @IsNotEmpty()
  @IsString()
  shortName!: string

  @IsNotEmpty()
  @IsNumber()
  value!: number

  @IsNotEmpty()
  @IsEnum(PersonTypeEnum)
  personType!: PersonTypeEnum

  @IsNotEmpty()
  @IsInt()
  serviceId!: number
}

export type OutputCreateFees = OutputCreateFeesDto
