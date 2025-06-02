import { api } from "~/shared/utils/api"


export const patchSettings = (data: FormData) =>{
  return api.patch("settings/", data)
}
