export interface ChatResponse {
	output: Output;
	usage: Usage;
	request_id: string;
}

export interface Output {
	thoughts: Thought[];
	session_id: string;
	finish_reason: string;
	text: string;
	reject_status: boolean;
}

export interface Thought {
	action_input_stream?: string;
	thought: string;
	action_type: string;
	observation?: string;
	action_name: string;
	action: string;
	arguments?: string;
	response?: string;
}

export interface Usage {
	models: Model[];
}

export interface Model {
	input_tokens: number;
	output_tokens: number;
	model_id: string;
}
