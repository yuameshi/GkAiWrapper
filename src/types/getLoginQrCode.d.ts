export interface GetLoginQrCodeResponse {
	code: number;
	level: any;
	msg: string;
	ok: boolean;
	data: Data;
}

export interface Data {
	codeUrl: string;
	uuid: string;
}
