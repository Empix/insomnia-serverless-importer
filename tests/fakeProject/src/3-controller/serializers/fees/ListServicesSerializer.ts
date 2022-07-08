import { OutputListServicesDto } from '@business/dtos/fees/ListServicesDto'
import { Validatable } from '@serverless/common/lib/3-controller/serializers/abstractValidatable'

export class InputListServices extends Validatable<InputListServices> {}

export type OutputListServices = OutputListServicesDto
