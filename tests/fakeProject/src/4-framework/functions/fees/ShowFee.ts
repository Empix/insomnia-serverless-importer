import 'source-map-support/register'
import 'reflect-metadata'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { container } from '@shared/ioc/container'
import { middyfy } from '@serverless/common/lib/4-framework/utility/middyfy'
import { httpHandler } from '@serverless/common/lib/4-framework/utility/httpHandler'
import { ShowFeeOperator } from '@controller/operations/fees/ShowFeeOperator'
import { InputShowFee } from '@controller/serializers/fees/ShowFeeSerializer'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(ShowFeeOperator)
  const shortName = event.pathParameters.id.replace('-', ' ') // pathParameter id referente ao shortName
  const input = new InputShowFee({ shortName })
  const result = await operator.exec(input)

  return result
})

export const handler = middyfy(main)
