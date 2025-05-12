import {GetLoginQrCodeResponse} from '../types/getLoginQrCode';

export const getLoginQrCode = async () => {
	const response = await fetch(
		'https://cas.gdust.edu.cn/cas-api/cas/loginCode',
	);

	const data: GetLoginQrCodeResponse = await response.json();

	if (data.code !== 0) {
		throw new Error('success');
	}
	return data.data.codeUrl;
};
