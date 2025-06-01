type OrderBy =
	| "created_at"
	| "-created_at"
	| "updated_at"
	| "-updated_at"
	| "id"
	| "-id"
	| string;

export type BaseListParams = Partial<{
  limit: number;
  offset: number;
	created_at_from: string;
	created_at_to: string;
	updated_at_from: string;
	updated_at_to: string;
	order_by: OrderBy;
}>;
