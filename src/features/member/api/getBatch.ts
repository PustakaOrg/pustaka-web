import { api } from "~/shared/utils/api"
import { Batch } from "~/types/entities/Batch"


export const getBatch= (id:string) => {
  return api.get<Batch>(`batches/${id}`)
}
