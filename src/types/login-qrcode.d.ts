export interface LoginQrCodeApiResponse {
	code: number;
	msg: string;
	success: boolean;
	data: Data;
}

export interface Data {
	userBase: UserBase;
}

export interface UserBase {
	id: string;
	token: string;
	roles: Role[];
	realName: string;
	sex: number;
	email: string;
}

export interface Role {
	roleName: string;
	id: number;
	privileges: Privilege[];
}

export interface Privilege {
	id: number;
	roleId: number;
	privilegeKey: string;
}
