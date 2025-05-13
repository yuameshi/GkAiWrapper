import { getToken } from '../store/token';
import type { ChatResponse } from '../types/chat';
import EventSource from 'react-native-sse';

export const chat = async (
	id: number,
	sessionId: string,
	model: number,
	content: string,
	onMsg: (msg: ChatResponse) => any,
	onError: (error: Error) => any,
) => {
	const es = new EventSource<'result'>(
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
				model: model,
			}),
			method: 'POST',
		},
	);

	es.addEventListener('result', event => {
		if (!event.data) {
			return;
		}
		const data: ChatResponse = JSON.parse(event.data);
		onMsg(data);
		if (data.output.finish_reason === 'stop') {
			es.close();
		}
	});

	es.addEventListener('error', () => {
		onError(new Error('An error occurred while fetching data.'));
		es.close();
	});
};
