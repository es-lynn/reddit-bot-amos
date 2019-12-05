import { APIGatewayProxyResult, Callback, Context, Handler } from 'aws-lambda'

export async function hello_world (event: any, context: Context) {
	return {
		statusCode: 200,
		body: JSON.stringify({text:'Hello World'})
	}
}