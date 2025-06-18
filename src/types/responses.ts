export interface PaginatedResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

export interface ImportResponse {
	detail: string;
	created: number;
	skipped: number;
}
