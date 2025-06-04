import { Batch } from "./Batch";
import { Class } from "./Class";

export type Member = {
	id: string;
	profile_picture: string;
	phone_number: string;
	nis: string;
	_class: Class;
	account: {
		id: string;
		fullname: string;
		email: string;
		group: string;
	};
  batch : Batch | null
  expires_date: string
};
