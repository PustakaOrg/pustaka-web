import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/getProfile";
import {
	isAdminObject,
	isLibrarianObject,
	isMemberObject,
} from "../utils/util";
import { Member } from "~/types/entities/Member";
import { Librarian } from "~/types/entities/Librarian";
import { Admin } from "~/types/entities/Admin";

const useProfile = () => {
	let {
		data: profile,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["profile"],
		queryFn: () => getProfile(),
		retry: false,
    staleTime: Infinity
	});

	if (isMemberObject(profile)) {
		return { profile: profile as Member, isPending, isError, error };
	} else if (isLibrarianObject(profile)) {
		return { profile: profile as Librarian, isPending, isError, error };
	} else if (isAdminObject(profile)) {
		return { profile: profile as Admin, isPending, isError, error };
	}

	return { profile: undefined, isPending, isError, error };
};

export default useProfile;
