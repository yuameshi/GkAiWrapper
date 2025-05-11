import type {CreateSessionResponse} from '../types/create-session';
import {TOKEN} from '../../credentials';

export const createSession = async (): Promise<CreateSessionResponse> => {
	const response = await fetch(
		'https://portal.gdust.edu.cn/smart-admin-api/app/aiChat/createSession',
		{
			headers: {
				token: TOKEN,
				Referer: 'https://portal.gdust.edu.cn/',
			},
			body: null,
			method: 'POST',
		},
	);

	const data = await response.json();
	return data;
};
