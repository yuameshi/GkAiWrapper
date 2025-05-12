import {LoginQrCodeApiResponse} from '../../types/login-qrcode';

export const LoginQrCodeApi = async (code: string) => {
	const response = await fetch(
		`https://portal.gdust.edu.cn/smart-admin-api/user/login?loginCode=${code}&appId=portalRemote`,
	);

	const json: LoginQrCodeApiResponse = await response.json();

	if (json.code !== 1) {
		throw new Error(json.msg);
	}

	return json.data.userBase.token;
};
