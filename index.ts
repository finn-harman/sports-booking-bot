import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler } from "aws-lambda";
import * as _ from "lodash";

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> => {
    const response = {
      statusCode: 200,
      body: JSON.stringify("Hello from Lambda and Github, hi!"),
    }
    return response
  }