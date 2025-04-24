export const isAdminObject = (obj: unknown): obj is { group: string } => {
	if (typeof obj === "object" && obj !== null && "group" in obj) {
		return true;
	}

	return false;
};

export const isMemberObject = (obj: unknown) => {
	if (typeof obj === "object" && obj !== null && "nis" in obj) {
		return true;
	}

	return false;
};

export const isLibrarianObject = (obj: unknown) => {
	if (typeof obj === "object" && obj !== null && "nis" in obj) {
		return true;
	}

	return false;
};
