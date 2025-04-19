export const defaultParams = <T extends object>(bookParam: T) => {
	return Object.fromEntries(
		Object.entries(bookParam).filter(
			([_, value]) =>
				value !== undefined && !(Array.isArray(value) && value.length === 0),
		),
	) as T;
};
