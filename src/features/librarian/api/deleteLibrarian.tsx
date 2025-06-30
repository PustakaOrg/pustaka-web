import { api } from "~/shared/utils/api"

export const deleteLibrarian= (id: string,) => {
  return api.delete(`librarians/${id}/`)
} 
