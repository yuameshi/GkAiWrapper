import type { GetLoginVerificationCodeResponse } from '../types/getLoginVerificationCode';

export const getLoginQrCode = async () => {
	const response = await fetch(
		'https://cas.gdust.edu.cn/cas-api/cas/loginCode',
	);

	const data: GetLoginVerificationCodeResponse = await response.json();
	if (data.code !== 0) {
		throw new Error('success');
	}
	return {
		uuid: data.data.uuid,
		img: data.data.codeUrl,
	};
};
