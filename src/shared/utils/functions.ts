export const defaultParams = <T extends object>(bookParam: T) => {
	return Object.fromEntries(
		Object.entries(bookParam).filter(
			([_, value]) =>
				value !== undefined && !(Array.isArray(value) && value.length === 0),
		),
	) as T;
};

export const formatDate = (isoString: string) => {
	const date = new Date(isoString);

	return date.toLocaleDateString("en-ID");
};

export const formatDateYYYYMMDD = (date: Date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); 
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
};
