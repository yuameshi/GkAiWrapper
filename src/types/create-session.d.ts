export interface CreateSessionResponse {
	code: number;
	msg: string;
	success: boolean;
	data: Data;
}

export interface Data {
	id: number;
	jobNumber: string;
	sessionId: string;
	title: string;
	messages: any[];
	model: number;
	gmtCreate: number;
	gmtModify: number;
}
