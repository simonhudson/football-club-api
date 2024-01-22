export interface ApiResponseBase {
	status: number;
	metadata: {
		count: number;
	};
	data: any[];
}
