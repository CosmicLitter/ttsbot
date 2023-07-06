// import { OPENAI_KEY } from "$env/static/private";

// import type { ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai';
// import type { RequestHandler } from './$types';
// import { OpenAiModel, defaultOpenAiSettings, type OpenAiSettings } from '$lib/openai';
// import { error } from '@sveltejs/kit';
// import { getErrorMessage, respondToClient, throwIfUnset } from '$lib/error';

// export const POST: RequestHandler = async ({ request, fetch }) => {
// 	try {
// 		const requestData = await request.json();
// 		throwIfUnset('request data', requestData);

// 		const messages: ChatCompletionRequestMessage[] = requestData.messages;
// 		throwIfUnset('messages', messages);

// 		const fixedMessages = [
		
// 			...messages,
// 			{
// 				role: 'user',
// 				content:
// 					"Create a Starfield fact"
// 			} as ChatCompletionRequestMessage
// 		];

// 		const settings: OpenAiSettings = {
// 			...defaultOpenAiSettings,
// 			model: OpenAiModel.Gpt35Turbo
// 		};

// 		// const openAiKey: string = requestData.openAiKey;
// 		// throwIfUnset('OpenAI API key', openAiKey);

// 		const completionOpts: CreateChatCompletionRequest = {
// 			...settings,
// 			messages: fixedMessages,
// 			stream: false
// 		};

// 		const apiUrl = 'https://api.openai.com/v1/chat/completions';

// 		const response = await fetch(apiUrl, {
// 			headers: {
// 				Authorization: `Bearer ${OPENAI_KEY}`,
// 				'Content-Type': 'application/json'
// 			},
// 			method: 'POST',
// 			body: JSON.stringify(completionOpts)
// 		});

// 		if (!response.ok) {
// 			const err = await response.json();
// 			throw err.error;
// 		}
// 		const result = await response.json();
// 		// strip leading and trailing quotes
// 		const fact = result.choices[0].message.content

// 		return respondToClient({ fact });
// 	} catch (err) {
// 		throw error(500, getErrorMessage(err));
// 	}
// };
