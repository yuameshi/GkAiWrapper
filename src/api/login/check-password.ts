import {CheckPasswordApiResponse} from '../../types/check-password';

export const CheckPasswordApi = async () => {
	const response = await fetch(
		'https://cas.gdust.edu.cn/cas-api/cas/checkPassword',
	);

	const data: CheckPasswordApiResponse = await response.json();

	if (data.code !== 0) {
		throw new Error(data.msg);
	} else {
		return true;
	}
};
