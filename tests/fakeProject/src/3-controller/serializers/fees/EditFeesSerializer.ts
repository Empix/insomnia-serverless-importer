import { OutputEditFeesDto } from '@business/dtos/fees/EditFeesDto'
import { Validatable } from '@serverless/common/lib/3-controller/serializers/abstractValidatable'
import { IsNotEmpty, IsOptional, IsNumber, IsString, IsEnum } from 'class-validator'
import { PersonTypeEnum } from '@domain/entities/fees/FeesEntity'

export class InputEditFees extends Validatable<InputEditFees> {
  @IsNotEmpty()
  @IsNumber()
  id!: number

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  shortName?: string

  @IsOptional()
  @IsNumber()
  value?: number

  @IsNotEmpty()
  @IsEnum(PersonTypeEnum, { message: 'PersonType must be "PJ" or "PF" value' })
  personType!: PersonTypeEnum

  @IsNotEmpty()
  @IsNumber()
  serviceId!: number
}

export type OutputEditFees = OutputEditFeesDto
