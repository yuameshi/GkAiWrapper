import {getToken} from '../store/token';
import type {ChatResponse} from '../types/chat';

export const chat = async (
	id: number,
	sessionId: string,
	content: string,
): Promise<ChatResponse> => {
	const response = await fetch(
		'https://portal.gdust.edu.cn/smart-admin-api/app/aiChat/sendSessionMessage',
		{
			headers: {
				'Content-Type': 'application/json',
				token: (await getToken()) || '',
				Referer: 'https://portal.gdust.edu.cn/',
				'Referrer-Policy': 'strict-origin-when-cross-origin',
			},
			body: JSON.stringify({
				id: id,
				question: content,
				sessionId: sessionId,
				model: 2,
			}),
			method: 'POST',
		},
	);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const responseText = await response.text();
	const data = responseText.split('event:result\n');
	const lastOne = data.pop();
	const json = lastOne?.split('data:')[1].trim();
	if (json) {
		const parsedData = JSON.parse(json);
		return parsedData;
	} else {
		throw new Error('Invalid response format');
	}
};
