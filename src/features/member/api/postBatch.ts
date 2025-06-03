import { api } from "~/shared/utils/api";
import { Batch } from "~/types/entities/Batch";

export type PostBatchPayload = {
	name: string;
};

export const postBatch = (payload: PostBatchPayload)=>{
  return api.post<Batch>("batches/", payload)

}
