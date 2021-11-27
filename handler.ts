import { Handler } from 'aws-lambda';
import { request, gql } from 'graphql-request';

export const hello: Handler = (event: any) => {
	const response = {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: 'Go Serverless v1.0! Your function executed successfully!',
				input: event,
			},
			null,
			2
		),
	};

	return new Promise((resolve) => {
		resolve(response)
	})
}

export const signup: Handler = (event: any) => {
	const vals = JSON.parse(event.body);
	// console.log(vals);
	async function main() {
		const endpoint = 'https://bkend-test.hasura.app/v1/graphql';

		const query = gql`
			mutation {
				insert_users_one(object: {firstname: $firstname, lastname: $lastname, dob: $dob}) {
					id
				}
			}
		`;

		const variables = {
			firstname: vals.firtsname,
			lastname: vals.lastname,
			dob: vals.dob
		}

		const data = await request(endpoint, query, variables);
		console.log(JSON.stringify(data, undefined, 2));


		const response = {
			statusCode: 200,
			body: JSON.stringify(
				{
					message:' User Created Successfully'
				},
				null,
				2,
				
			),
		};

		return new Promise((resolve) => {
			resolve(response)
		})
	}

	main().catch((error) => console.error(error))
}