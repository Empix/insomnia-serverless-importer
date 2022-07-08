import { Validatable } from '@serverless/common/lib/3-controller/serializers/abstractValidatable'
import { IsNotEmpty, IsString, IsOptional, IsEnum, IsNumberString } from 'class-validator'

import { PersonTypeEnum } from '@domain/entities/fees/FeesEntity'
import { OutputListFeesDto } from '@business/dtos/fees/ListFeesDto'

export class InputListFees extends Validatable<InputListFees> {
  @IsNotEmpty()
  @IsNumberString()
  page!: number

  @IsOptional()
  @IsNumberString()
  pageSize?: number

  @IsOptional()
  @IsString()
  order?: string

  @IsOptional()
  @IsString()
  orderBy?: string

  @IsOptional()
  @IsNumberString()
  id?: number

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  shortName?: string

  @IsOptional()
  @IsString()
  value?: number

  @IsOptional()
  @IsString()
  service?: string

  @IsOptional()
  @IsEnum(PersonTypeEnum)
  personType?: PersonTypeEnum
}

export type OutputListFees = OutputListFeesDto
