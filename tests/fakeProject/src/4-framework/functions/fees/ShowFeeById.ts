import 'source-map-support/register'
import 'reflect-metadata'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { container } from '@shared/ioc/container'
import { middyfy } from '@serverless/common/lib/4-framework/utility/middyfy'
import { httpHandler } from '@serverless/common/lib/4-framework/utility/httpHandler'
import { ShowFeeByIdOperator } from '@controller/operations/fees/ShowFeeByIdOperator'
import { InputShowFeeById } from '@controller/serializers/fees/ShowFeeByIdSerializer'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(ShowFeeByIdOperator)
  const input = new InputShowFeeById({ id: Number(event.pathParameters.id) })
  const result = await operator.exec(input)

  return result
})

export const handler = middyfy(main)
