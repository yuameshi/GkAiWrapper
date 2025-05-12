import type { CreateSessionResponse } from '../types/create-session';
import { getToken } from '../store/token';

export const createSession = async (): Promise<CreateSessionResponse> => {
	const response = await fetch(
		'https://portal.gdust.edu.cn/smart-admin-api/app/aiChat/createSession',
		{
			headers: {
				token: (await getToken()) || '',
				Referer: 'https://portal.gdust.edu.cn/',
			},
			body: null,
			method: 'POST',
		},
	);

	const data = await response.json();
	return data;
};
