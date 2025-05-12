import type { CheckPasswordApiResponse } from '../../types/check-password';

export const CheckPasswordApi = async (ticket: string) => {
	const response = await fetch(
		'https://cas.gdust.edu.cn/cas-api/cas/checkPassword',
		{
			headers: {
				Authorization: `Bearer ${ticket}`,
			},
		},
	);

	const data: CheckPasswordApiResponse = await response.json();

	console.log('CheckPasswordApi response:', data);
	if (data.code !== 0) {
		throw new Error(data.msg);
	} else {
		return true;
	}
};
